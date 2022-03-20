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
let discordBotConfig = new Config_1.Config("config.json");
let discordBot = new DiscordBot_1.DiscordBot(discordBotConfig);
let minecraftBots = [];
let paths = Files_1.Files.readDir("accounts");
for (let i = 0; i < paths.length; i++) {
    setTimeout(() => {
        let config = new Config_1.Config(paths[i]);
        if (config.get()["enabled"])
            minecraftBots.push(new MinecraftBot_1.MinecraftBot(config, setupMinecraftBotBehavior));
    }, (i + 1) * 1000);
}
discordBot.connect(() => {
    setupDiscordBotBehavior(discordBot, minecraftBots);
});
function setupDiscordBotBehavior(discordBot, minecraftBots) {
    discordBot.registerCommand(new SayCommand_1.SayCommand(minecraftBots));
    discordBot.registerCommand(new ListCommand_1.ListCommand(minecraftBots));
    discordBot.registerCommand(new AddCommand_1.AddCommand(minecraftBots));
    discordBot.registerCommand(new RemoveCommand_1.RemoveCommand(minecraftBots));
    discordBot.registerCommand(new EnableCommand_1.EnableCommand(minecraftBots));
    discordBot.registerCommand(new DisableCommand_1.DisableCommand(minecraftBots));
    discordBot.registerCommand(new ConnectCommand_1.ConnectCommand(minecraftBots));
    discordBot.registerCommand(new DisconnectCommand_1.DisconnectCommand(minecraftBots));
    discordBot.registerCommand(new StatusCommand_1.StatusCommand(minecraftBots));
    discordBot.registerCommand(new ResetCommand_1.ResetCommand(minecraftBots));
}
function setupMinecraftBotBehavior(minecraftBot) {
    let channelID = minecraftBot.config.get()["discord"]["channelID"];
    minecraftBot.once("spawn", new FirstSpawnListener_1.FirstSpawnListener(channelID, discordBot, minecraftBot));
    minecraftBot.on("kicked", new KickedListener_1.KickedListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
    minecraftBot.on("error", new ErrorListener_1.ErrorListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
    minecraftBot.on("chat", new ChatListener_1.ChatListener(channelID, discordBot, minecraftBot));
}
