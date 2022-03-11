import {MinecraftBot} from "./minecraftBot";
import {DiscordBot} from "./discordBot";
import {Config} from "./config";
import {Files} from "./files";
import {Message} from "discord.js";
import {Whitelist} from "./whitelist";
import {ChannelCommand} from "./channelCommand";

let discordBot: DiscordBot = new DiscordBot(new Config("config.json"));
let minecraftBots: MinecraftBot[] = [];
let minecraftBotPaths: string[] = Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
	minecraftBots.push(new MinecraftBot(new Config(minecraftBotPaths[i])));
}

discordBot.login();
for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	if (!minecraftBot.config.get()["enabled"]) continue;
	setupMinecraftBotBehavior(minecraftBot);
	setupDiscordBotBehavior(discordBot, minecraftBot);
}
discordBot.startListening();

function setupDiscordBotBehavior(discordBot: DiscordBot, minecraftBot: MinecraftBot) {
	let channelID: string = minecraftBot.config.get()["discord"]["channelID"];

	// "Say" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!say", (message: Message) => {
		minecraftBot.chat(message.toString());
	}));

	// "List" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!list", (message: Message) => {
		discordBot.sendMessage("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", message.channel.id).then();
	}));

	// "Add" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!add", (message: Message) => {
		if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.sendMessage("**That word is already on the whitelist.**", message.channel.id).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Added \"" + message.content + "\" to the whitelist.**", message.channel.id).then();
	}));

	// "Remove" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!remove", (message: Message) => {
		if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.sendMessage("**That word isn't on the whitelist.**", message.channel.id).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Removed \"" + message.content + "\" from the whitelist.**", message.channel.id).then();
	}));

	// "Enable" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!enable", (message: Message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = true;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist enabled.**", message.channel.id).then();
	}));

	// "Disable" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!disable", (message: Message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = false;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist disabled.**", message.channel.id).then();
	}));

	// "Connect" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!connect", (message: Message) => {
		if (minecraftBot.isConnected()) {
			discordBot.sendMessage("**The bot is already connected.**", minecraftBot.config.get()["discord"]["channelID"]).then();
		}
		else {
			minecraftBot.connect();
			setupMinecraftBotBehavior(minecraftBot);
		}
	}));

	// "Disconnect" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!disconnect", (message: Message) => {
		minecraftBot.disconnect();
		discordBot.sendMessage("**Successfully disconnected.**", message.channel.id).then();
	}));
}

function setupMinecraftBotBehavior(minecraftBot: MinecraftBot) {
	// "First Spawn" event.
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
		discordBot.sendMessage("**Successfully connected.**", minecraftBot.config.get()["discord"]["channelID"]).then();
	});

	// "Kicked" event.
	minecraftBot.onKicked((reason: string) => {
		discordBot.sendMessage(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has disconnected! Reason:** *${JSON.parse(reason)["text"]}*`, minecraftBot.config.get()["discord"]["channelID"]).then();
		if (minecraftBot.config.get()["autoRejoin"]) {
			discordBot.sendMessage("**Attempting to reconnect...**", minecraftBot.config.get()["discord"]["channelID"]).then();
			setTimeout(() => {
				minecraftBot.connect();
				setupMinecraftBotBehavior(minecraftBot);
			}, 1000);
		}
	});

	// "Error" event.
	minecraftBot.onError((error: Error) => {
		discordBot.sendMessage(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error! Reason:** *${error.message}*`, minecraftBot.config.get()["discord"]["channelID"]).then();
	});

	// "Chat" event.
	minecraftBot.onChat((username: string, message: string) => {
		let toSend: string = username + ": " + message;
		if (!minecraftBot.config.get()["whitelist"]["enabled"] || new Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
			discordBot.sendMessage(toSend, minecraftBot.config.get()["discord"]["channelID"]).then();
		}
		if (minecraftBot.config.get()["log"]["enabled"]) {
			Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
		}
	});
}