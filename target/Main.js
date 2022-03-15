"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MinecraftBot_1 = require("./MinecraftBot");
const DiscordBot_1 = require("./DiscordBot");
const Config_1 = require("./Config");
const Files_1 = require("./Files");
const SayCommand_1 = require("./commands/SayCommand");
const ListCommand_1 = require("./commands/ListCommand");
const AddCommand_1 = require("./commands/AddCommand");
const RemoveCommand_1 = require("./commands/RemoveCommand");
const EnableCommand_1 = require("./commands/EnableCommand");
const DisableCommand_1 = require("./commands/DisableCommand");
const ConnectCommand_1 = require("./commands/ConnectCommand");
const DisconnectCommand_1 = require("./commands/DisconnectCommand");
const StatusCommand_1 = require("./commands/StatusCommand");
const FirstSpawnListener_1 = require("./listeners/FirstSpawnListener");
const KickedListener_1 = require("./listeners/KickedListener");
const ErrorListener_1 = require("./listeners/ErrorListener");
const ChatListener_1 = require("./listeners/ChatListener");
const ResetCommand_1 = require("./commands/ResetCommand");
let discordBot = new DiscordBot_1.DiscordBot(new Config_1.Config("config.json"));
let minecraftBots = [];
let minecraftBotPaths = Files_1.Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
    minecraftBots.push(new MinecraftBot_1.MinecraftBot(new Config_1.Config(minecraftBotPaths[i])));
}
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
    discordBot.registerCommand(new SayCommand_1.SayCommand(channelID, minecraftBot));
    discordBot.registerCommand(new ListCommand_1.ListCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new AddCommand_1.AddCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new RemoveCommand_1.RemoveCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new EnableCommand_1.EnableCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new DisableCommand_1.DisableCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new ConnectCommand_1.ConnectCommand(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
    discordBot.registerCommand(new DisconnectCommand_1.DisconnectCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new StatusCommand_1.StatusCommand(channelID, discordBot, minecraftBot));
    discordBot.registerCommand(new ResetCommand_1.ResetCommand(channelID, discordBot, minecraftBot));
}
function setupMinecraftBotBehavior(minecraftBot) {
    let channelID = minecraftBot.config.get()["discord"]["channelID"];
    minecraftBot.once("spawn", new FirstSpawnListener_1.FirstSpawnListener(channelID, discordBot, minecraftBot));
    minecraftBot.on("kicked", new KickedListener_1.KickedListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
    minecraftBot.on("error", new ErrorListener_1.ErrorListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
    minecraftBot.on("chat", new ChatListener_1.ChatListener(channelID, discordBot, minecraftBot));
}
