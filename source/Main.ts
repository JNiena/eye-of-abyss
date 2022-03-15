import {MinecraftBot} from "./MinecraftBot";
import {DiscordBot} from "./DiscordBot";
import {Config} from "./Config";
import {Files} from "./Files";
import {SayCommand} from "./commands/SayCommand";
import {ListCommand} from "./commands/ListCommand";
import {AddCommand} from "./commands/AddCommand";
import {RemoveCommand} from "./commands/RemoveCommand";
import {EnableCommand} from "./commands/EnableCommand";
import {DisableCommand} from "./commands/DisableCommand";
import {ConnectCommand} from "./commands/ConnectCommand";
import {DisconnectCommand} from "./commands/DisconnectCommand";
import {StatusCommand} from "./commands/StatusCommand";
import {FirstSpawnListener} from "./listeners/FirstSpawnListener";
import {KickedListener} from "./listeners/KickedListener";
import {ErrorListener} from "./listeners/ErrorListener";
import {ChatListener} from "./listeners/ChatListener";
import {ResetCommand} from "./commands/ResetCommand";

let discordBot: DiscordBot = new DiscordBot(new Config("config.json"));
let minecraftBots: MinecraftBot[] = [];
let minecraftBotPaths: string[] = Files.paths("accounts");
for (let i = 0; i < minecraftBotPaths.length; i++) {
	minecraftBots.push(new MinecraftBot(new Config(minecraftBotPaths[i])));
}

discordBot.connect();
for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	if (!minecraftBot.config.get()["enabled"]) continue;
	minecraftBot.connect();
	setupMinecraftBotBehavior(minecraftBot);
	setupDiscordBotBehavior(discordBot, minecraftBot);
}

function setupDiscordBotBehavior(discordBot: DiscordBot, minecraftBot: MinecraftBot): void {
	let channelID: string = minecraftBot.config.get()["discord"]["channelID"];
	discordBot.registerCommand(new SayCommand(channelID, minecraftBot));
	discordBot.registerCommand(new ListCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new AddCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new RemoveCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new EnableCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new DisableCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new ConnectCommand(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
	discordBot.registerCommand(new DisconnectCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new StatusCommand(channelID, discordBot, minecraftBot));
	discordBot.registerCommand(new ResetCommand(channelID, discordBot, minecraftBot));
}

function setupMinecraftBotBehavior(minecraftBot: MinecraftBot): void {
	let channelID: string = minecraftBot.config.get()["discord"]["channelID"];
	minecraftBot.once("spawn", new FirstSpawnListener(channelID, discordBot, minecraftBot));
	minecraftBot.on("kicked", new KickedListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
	minecraftBot.on("error", new ErrorListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
	minecraftBot.on("chat", new ChatListener(channelID, discordBot, minecraftBot));
}