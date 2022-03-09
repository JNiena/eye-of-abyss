"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minecraftBot_1 = require("./minecraftBot");
const discordBot_1 = require("./discordBot");
const config_1 = require("./config");
const files_1 = require("./files");
const command_1 = require("./command");
const whitelist_1 = require("./whitelist");
// Setup discord bot.
let discordBot = new discordBot_1.DiscordBot(new config_1.Config("config.json"));
// Setup minecraft bots.
let minecraftBots = [];
let minecraftBotPaths = files_1.Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
    minecraftBots.push(new minecraftBot_1.MinecraftBot(new config_1.Config(minecraftBotPaths[i])));
}
// Discord bot behavior.
discordBot.login();
discordBot.registerCommand(new command_1.Command("!say", (message) => {
    for (let i = 0; i < minecraftBots.length; i++) {
        if (minecraftBots[i].config.get()["discord"]["channelID"] !== message.channel.id)
            continue;
        minecraftBots[i].chat(message.toString());
    }
}));
discordBot.registerCommand(new command_1.Command("!list", (message) => {
    let minecraftBot = matchBot(message.channel.id);
    if (minecraftBot === undefined)
        return;
    discordBot.sendMessage("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", message.channel.id).then();
}));
discordBot.registerCommand(new command_1.Command("!add", (message) => {
    let minecraftBot = matchBot(message.channel.id);
    if (minecraftBot === undefined)
        return;
    minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
    minecraftBot.config.save();
    discordBot.sendMessage("**Added \"" + message.content + "\" to the whitelist.**", message.channel.id).then();
}));
discordBot.registerCommand(new command_1.Command("!remove", (message) => {
    let minecraftBot = matchBot(message.channel.id);
    if (minecraftBot === undefined)
        return;
    minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== message.content.toLowerCase());
    minecraftBot.config.save();
    discordBot.sendMessage("**Removed \"" + message.content + "\" from the whitelist.**", message.channel.id).then();
}));
discordBot.registerCommand(new command_1.Command("!enable", (message) => {
    let minecraftBot = matchBot(message.channel.id);
    if (minecraftBot === undefined)
        return;
    minecraftBot.config.get()["whitelist"]["enabled"] = true;
    minecraftBot.config.save();
    discordBot.sendMessage("**Whitelist enabled.**", message.channel.id).then();
}));
discordBot.registerCommand(new command_1.Command("!disable", (message) => {
    let minecraftBot = matchBot(message.channel.id);
    if (minecraftBot === undefined)
        return;
    minecraftBot.config.get()["whitelist"]["enabled"] = false;
    minecraftBot.config.save();
    discordBot.sendMessage("**Whitelist disabled.**", message.channel.id).then();
}));
discordBot.startListening();
// Minecraft bot behavior.
for (let i = 0; i < minecraftBots.length; i++) {
    let minecraftBot = minecraftBots[i];
    if (!minecraftBot.config.get()["enabled"])
        continue;
    minecraftBot.onFirstSpawn(() => {
        minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
    });
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
function matchBot(channelID) {
    for (let i = 0; i < minecraftBots.length; i++) {
        if (minecraftBots[i].config.get()["discord"]["channelID"] === channelID)
            return minecraftBots[i];
    }
}
