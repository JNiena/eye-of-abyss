import {MinecraftBot} from "./minecraftBot";
import {DiscordBot} from "./discordBot";
import {Config} from "./config";
import {Files} from "./files";
import {Command} from "./command";
import {Message} from "discord.js";
import {Whitelist} from "./whitelist";

let discordBot: DiscordBot = new DiscordBot(new Config("config.json"));
let minecraftBots: MinecraftBot[] = [];
let minecraftBotPaths: string[] = Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
	minecraftBots.push(new MinecraftBot(new Config(minecraftBotPaths[i])));
}

setupDiscordBotBehavior(discordBot);
for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	if (!minecraftBot.config.get()["enabled"]) continue;
	setupMinecraftBotBehavior(minecraftBot);
}

function setupDiscordBotBehavior(discordBot: DiscordBot) {
	discordBot.login();
	discordBot.registerCommand(new Command("!say", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.chat(message.toString());
	}));
	discordBot.registerCommand(new Command("!list", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		discordBot.sendMessage("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", message.channel.id).then();
	}));
	discordBot.registerCommand(new Command("!add", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Added \"" + message.content + "\" to the whitelist.**", message.channel.id).then();
	}));
	discordBot.registerCommand(new Command("!remove", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Removed \"" + message.content + "\" from the whitelist.**", message.channel.id).then();
	}));
	discordBot.registerCommand(new Command("!enable", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.config.get()["whitelist"]["enabled"] = true;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist enabled.**", message.channel.id).then();
	}));
	discordBot.registerCommand(new Command("!disable", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.config.get()["whitelist"]["enabled"] = false;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist disabled.**", message.channel.id).then();
	}));
	discordBot.registerCommand(new Command("!connect", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.connect();
		setupMinecraftBotBehavior(minecraftBot);
	}));
	discordBot.registerCommand(new Command("!disconnect", (message: Message) => {
		let minecraftBot: MinecraftBot | undefined = matchBot(message.channel.id);
		if (minecraftBot === undefined) return;
		minecraftBot.disconnect();
		discordBot.sendMessage("**Successfully disconnected.**", message.channel.id).then();
	}));
	discordBot.startListening();
}

function setupMinecraftBotBehavior(minecraftBot: MinecraftBot) {
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
		discordBot.sendMessage("**Successfully connected.**", minecraftBot.config.get()["discord"]["channelID"]).then();
	});
	minecraftBot.onKicked((reason: string) => {
		discordBot.sendMessage(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has disconnected!\nReason:** *${JSON.parse(reason)["text"]}*`, minecraftBot.config.get()["discord"]["channelID"]).then();
		if (minecraftBot.config.get()["autoRejoin"]) {
			discordBot.sendMessage("**Attempting to reconnect...**", minecraftBot.config.get()["discord"]["channelID"]).then();
			setTimeout(() => {
				minecraftBot.connect();
				setupMinecraftBotBehavior(minecraftBot);
			}, 1000);
		}
	});
	minecraftBot.onError((error: Error) => {
		discordBot.sendMessage(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error!\nReason:** *${error.message}*`, minecraftBot.config.get()["discord"]["channelID"]).then();
	});
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

function matchBot(channelID: string): MinecraftBot | undefined {
	for (let i = 0; i < minecraftBots.length; i++) {
		if (minecraftBots[i].config.get()["discord"]["channelID"] === channelID) return minecraftBots[i];
	}
}