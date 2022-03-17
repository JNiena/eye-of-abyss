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

let discordBotConfig: Config = new Config("config.json");
let discordBot: DiscordBot = new DiscordBot(discordBotConfig);

let minecraftBots: MinecraftBot[] = [];
Files.readDir("accounts").forEach(path => {
	minecraftBots.push(new MinecraftBot(new Config(path), setupMinecraftBotBehavior));
});

discordBot.connect(() => {
	setupDiscordBotBehavior(discordBot, minecraftBots);
});

function setupDiscordBotBehavior(discordBot: DiscordBot, minecraftBots: MinecraftBot[]): void {
	discordBot.registerCommand(new SayCommand(minecraftBots));
	discordBot.registerCommand(new ListCommand(minecraftBots));
	discordBot.registerCommand(new AddCommand(minecraftBots));
	discordBot.registerCommand(new RemoveCommand(minecraftBots));
	discordBot.registerCommand(new EnableCommand(minecraftBots));
	discordBot.registerCommand(new DisableCommand(minecraftBots));
	discordBot.registerCommand(new ConnectCommand(minecraftBots));
	discordBot.registerCommand(new DisconnectCommand(minecraftBots));
	discordBot.registerCommand(new StatusCommand(minecraftBots));
	discordBot.registerCommand(new ResetCommand(minecraftBots));
}

function setupMinecraftBotBehavior(minecraftBot: MinecraftBot): void {
	let channelID: string = minecraftBot.config.get()["discord"]["channelID"];
	minecraftBot.once("spawn", new FirstSpawnListener(channelID, discordBot, minecraftBot));
	minecraftBot.on("kicked", new KickedListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
	minecraftBot.on("error", new ErrorListener(channelID, discordBot, minecraftBot, setupMinecraftBotBehavior));
	minecraftBot.on("chat", new ChatListener(channelID, discordBot, minecraftBot));
}