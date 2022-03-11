"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const minecraftBot_1 = require("./minecraftBot");
const discordBot_1 = require("./discordBot");
const config_1 = require("./config");
const files_1 = require("./files");
const whitelist_1 = require("./whitelist");
const channelCommand_1 = require("./channelCommand");
let discordBot = new discordBot_1.DiscordBot(new config_1.Config("config.json"));
let minecraftBots = [];
let minecraftBotPaths = files_1.Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
	minecraftBots.push(new minecraftBot_1.MinecraftBot(new config_1.Config(minecraftBotPaths[i])));
}
discordBot.login();
for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	if (!minecraftBot.config.get()["enabled"]) {
		continue;
	}
	setupMinecraftBotBehavior(minecraftBot);
	setupDiscordBotBehavior(discordBot, minecraftBot);
}
discordBot.startListening();

function setupDiscordBotBehavior(discordBot, minecraftBot) {
	let channelID = minecraftBot.config.get()["discord"]["channelID"];
	// "Say" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!say", (message) => {
		minecraftBot.chat(message.toString());
	}));
	// "List" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!list", (message) => {
		discordBot.sendMessage("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", message.channel.id).then();
	}));
	// "Add" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!add", (message) => {
		if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.sendMessage("**That word is already on the whitelist.**", message.channel.id).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Added \"" + message.content + "\" to the whitelist.**", message.channel.id).then();
	}));
	// "Remove" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!remove", (message) => {
		if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
			discordBot.sendMessage("**That word isn't on the whitelist.**", message.channel.id).then();
			return;
		}
		minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== message.content.toLowerCase());
		minecraftBot.config.save();
		discordBot.sendMessage("**Removed \"" + message.content + "\" from the whitelist.**", message.channel.id).then();
	}));
	// "Enable" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!enable", (message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = true;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist enabled.**", message.channel.id).then();
	}));
	// "Disable" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!disable", (message) => {
		minecraftBot.config.get()["whitelist"]["enabled"] = false;
		minecraftBot.config.save();
		discordBot.sendMessage("**Whitelist disabled.**", message.channel.id).then();
	}));
	// "Connect" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!connect", (message) => {
		if (minecraftBot.isConnected()) {
			discordBot.sendMessage("**The bot is already connected.**", minecraftBot.config.get()["discord"]["channelID"]).then();
		}
		else {
			minecraftBot.connect();
			setupMinecraftBotBehavior(minecraftBot);
		}
	}));
	// "Disconnect" command.
	discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!disconnect", (message) => {
		minecraftBot.disconnect();
		discordBot.sendMessage("**Successfully disconnected.**", message.channel.id).then();
	}));
}

function setupMinecraftBotBehavior(minecraftBot) {
	// "First Spawn" event.
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
		discordBot.sendMessage("**Successfully connected.**", minecraftBot.config.get()["discord"]["channelID"]).then();
	});
	// "Kicked" event.
	minecraftBot.onKicked((reason) => {
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
	minecraftBot.onError((error) => {
		discordBot.sendMessage(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error! Reason:** *${error.message}*`, minecraftBot.config.get()["discord"]["channelID"]).then();
	});
	// "Chat" event.
	minecraftBot.onChat((username, message) => {
		let toSend = username + ": " + message;
		if (!minecraftBot.config.get()["whitelist"]["enabled"] || new whitelist_1.Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
			discordBot.sendMessage(toSend, minecraftBot.config.get()["discord"]["channelID"]).then();
		}
		if (minecraftBot.config.get()["log"]["enabled"]) {
			files_1.Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
		}
	});
}