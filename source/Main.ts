import { LogLevel } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { Config } from "./Config";
import { DiscordClient } from "./DiscordClient";
import { ChatListener } from "./minecraft/ChatListener";
import { DeathListener } from "./minecraft/DeathListener";
import { ErrorListener } from "./minecraft/ErrorListener";
import { JoinListener } from "./minecraft/JoinListener";
import { KickedListener } from "./minecraft/KickedListener";
import { MinecraftBot } from "./MinecraftBot";
import { Repeater } from "./Repeater";

const config: Config = new Config(process.argv[2]);

const discordBot: DiscordClient = new DiscordClient({
	"intents": [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	"loadMessageCommandListeners": true,
	"loadDefaultErrorListeners": true,
	"loadSubcommandErrorListeners": true,
	"loadPlugins": true,
	"logger": { "level": LogLevel.Debug }
});

const minecraftBot: MinecraftBot = new MinecraftBot();
new ErrorListener();
new ChatListener();
new JoinListener();
new KickedListener();
new DeathListener();
Repeater.start();

// minecraftBot.connect();
discordBot.login(config.get().discord.token).then();

export {
	config,
	discordBot,
	minecraftBot
};