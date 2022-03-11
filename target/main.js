"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minecraftBot_1 = require("./minecraftBot");
const discordBot_1 = require("./discordBot");
const config_1 = require("./config");
const files_1 = require("./files");
const whitelist_1 = require("./whitelist");
const channelCommand_1 = require("./channelCommand");
// Read from configuration.
let discordBot = new discordBot_1.DiscordBot(new config_1.Config("config.json"));
let minecraftBots = [];
let minecraftBotPaths = files_1.Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
    minecraftBots.push(new minecraftBot_1.MinecraftBot(new config_1.Config(minecraftBotPaths[i])));
}
// Setup bot behavior.
discordBot.connect();
for (let i = 0; i < minecraftBots.length; i++) {
    let minecraftBot = minecraftBots[i];
    if (!minecraftBot.config.get()["enabled"])
        continue;
    minecraftBot.connect();
    setupMinecraftBotBehavior(minecraftBot);
    setupDiscordBotBehavior(discordBot, minecraftBot);
}
function setupDiscordBotBehavior(discordBot, minecraftBot) {
    let channelID = minecraftBot.config.get()["discord"]["channelID"];
    // "Say" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!say", (message) => {
        minecraftBot.chat(message.toString());
    }));
    // "List" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!list", (message) => {
        discordBot.send("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", channelID).then();
    }));
    // "Add" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!add", (message) => {
        if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
            discordBot.send("**That word is already on the whitelist.**", channelID).then();
            return;
        }
        minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
        minecraftBot.config.save();
        discordBot.send("**Added \"" + message.content + "\" to the whitelist.**", channelID).then();
    }));
    // "Remove" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!remove", (message) => {
        if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
            discordBot.send("**That word isn't on the whitelist.**", channelID).then();
            return;
        }
        minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== message.content.toLowerCase());
        minecraftBot.config.save();
        discordBot.send("**Removed \"" + message.content + "\" from the whitelist.**", channelID).then();
    }));
    // "Enable" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!enable", (message) => {
        minecraftBot.config.get()["whitelist"]["enabled"] = true;
        minecraftBot.config.save();
        discordBot.send("**Whitelist enabled.**", channelID).then();
    }));
    // "Disable" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!disable", (message) => {
        minecraftBot.config.get()["whitelist"]["enabled"] = false;
        minecraftBot.config.save();
        discordBot.send("**Whitelist disabled.**", channelID).then();
    }));
    // "Connect" command.
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!connect", (message) => {
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
    discordBot.registerCommand(new channelCommand_1.ChannelCommand(channelID, "!disconnect", (message) => {
        if (!minecraftBot.isConnected()) {
            discordBot.send("**The bot is already disconnected.**", channelID).then();
            return;
        }
        minecraftBot.disconnect();
        discordBot.send("**Successfully disconnected.**", channelID).then();
    }));
}
function setupMinecraftBotBehavior(minecraftBot) {
    let channelID = minecraftBot.config.get()["discord"]["channelID"];
    // "First Spawn" event.
    minecraftBot.onFirstSpawn(() => {
        minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
        discordBot.send("**Successfully connected.**", channelID).then();
    });
    // "Kicked" event.
    minecraftBot.onKicked((reason) => {
        discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has disconnected! Reason: ${JSON.parse(reason)["text"]}**`, channelID).then();
        if (minecraftBot.config.get()["autoRejoin"]["enabled"]) {
            discordBot.send(`**Attempting to reconnect in ${minecraftBot.config.get()["autoRejoin"]["delay"] / 1000} seconds...**`, channelID).then();
            minecraftBot.reconnect(() => {
                setupMinecraftBotBehavior(minecraftBot);
            });
        }
    });
    // "Error" event.
    minecraftBot.onError((error) => {
        discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error! Reason: ${error.message}**`, channelID).then();
    });
    // "Chat" event.
    minecraftBot.onChat((username, message) => {
        let toSend = username + ": " + message;
        if (!minecraftBot.config.get()["whitelist"]["enabled"] || new whitelist_1.Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
            discordBot.send(toSend, channelID).then();
        }
        if (minecraftBot.config.get()["log"]["enabled"]) {
            files_1.Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
        }
    });
}
