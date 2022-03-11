import {MinecraftBot} from "./minecraftBot";
import {DiscordBot} from "./discordBot";
import {Config} from "./config";
import {Files} from "./files";
import {Message} from "discord.js";
import {Whitelist} from "./whitelist";
import {ChannelCommand} from "./channelCommand";

// Read from configuration.
let discordBot: DiscordBot = new DiscordBot(new Config("config.json"));
let minecraftBots: MinecraftBot[] = [];
let minecraftBotPaths: string[] = Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
	minecraftBots.push(new MinecraftBot(new Config(minecraftBotPaths[i])));
}

// Setup bot behavior.
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
		discordBot.send("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", channelID).then();
	}));

	// "Add" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!add", (message: Message) => {
		if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.send("**That word is already on the whitelist.**", channelID).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.send("**Added \"" + message.content + "\" to the whitelist.**", channelID).then();
	}));

	// "Remove" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!remove", (message: Message) => {
		if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.send("**That word isn't on the whitelist.**", channelID).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.send("**Removed \"" + message.content + "\" from the whitelist.**", channelID).then();
	}));

	// "Enable" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!enable", (message: Message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = true;
		minecraftBot.config.save();
		discordBot.send("**Whitelist enabled.**", channelID).then();
	}));

	// "Disable" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!disable", (message: Message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = false;
		minecraftBot.config.save();
		discordBot.send("**Whitelist disabled.**", channelID).then();
	}));

	// "Connect" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!connect", (message: Message) => {
		if (minecraftBot.isReconnecting()) {
			discordBot.send("**The bot is already attempting to reconnect, please wait.**", channelID).then();
			return;
		}
		if (minecraftBot.isConnected()) {
			discordBot.send("**The bot is already connected.**", channelID).then();
			return;
		}
		minecraftBot.connect();
		setupMinecraftBotBehavior(minecraftBot);
	}));

	// "Disconnect" command.
	discordBot.registerCommand(new ChannelCommand(channelID, "!disconnect", (message: Message) => {
		if (!minecraftBot.isConnected()) {
			discordBot.send("**The bot is already disconnected.**", channelID).then();
			return;
		}
		minecraftBot.disconnect();
		discordBot.send("**Successfully disconnected.**", channelID).then();
	}));
}

function setupMinecraftBotBehavior(minecraftBot: MinecraftBot) {
	let channelID: string = minecraftBot.config.get()["discord"]["channelID"];

	// "First Spawn" event.
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
		discordBot.send("**Successfully connected.**", channelID).then();
	});

	// "Kicked" event.
	minecraftBot.onKicked((reason: string) => {
		discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has disconnected! Reason: ${JSON.parse(reason)["text"]}**`, channelID).then();
		if (minecraftBot.config.get()["autoRejoin"]["enabled"]) {
			discordBot.send(`**Attempting to reconnect in ${minecraftBot.config.get()["autoRejoin"]["delay"] / 1000} seconds...**`, channelID).then();
			minecraftBot.reconnect(() => {
				setupMinecraftBotBehavior(minecraftBot);
			});
		}
	});

	// "Error" event.
	minecraftBot.onError((error: Error) => {
		discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error! Reason: ${error.message}**`, channelID).then();
	});

	// "Chat" event.
	minecraftBot.onChat((username: string, message: string) => {
		let toSend: string = username + ": " + message;
		if (!minecraftBot.config.get()["whitelist"]["enabled"] || new Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
			discordBot.send(toSend, channelID).then();
		}
		if (minecraftBot.config.get()["log"]["enabled"]) {
			Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
		}
	});
}