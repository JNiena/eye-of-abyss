import { LogLevel } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { Config } from "./Config";
import { AbyssClient } from "./AbyssClient";
import { ChatHandler } from "./handlers/ChatHandler";
import { DeathHandler } from "./handlers/DeathHandler";
import { EndHandler } from "./handlers/EndHandler";
import { ErrorHandler } from "./handlers/ErrorHandler";
import { SpawnHandler } from "./handlers/SpawnHandler";
import { KickedHandler } from "./handlers/KickedHandler";
import { LoginHandler } from "./handlers/LoginHandler";
import { MinecraftBot } from "./MinecraftBot";

const config: Config = new Config(process.argv[2]);
const start: boolean = process.argv[3] === "--start";

const discordBot: AbyssClient = new AbyssClient({
	"intents": [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	"loadMessageCommandListeners": true,
	"loadDefaultErrorListeners": true,
	"loadSubcommandErrorListeners": true,
	"loadPlugins": true,
	"logger": { "level": LogLevel.Debug }
});

const minecraftBot: MinecraftBot = new MinecraftBot(() => {
	new ErrorHandler();
	new ChatHandler();
	new SpawnHandler();
	new KickedHandler();
	new DeathHandler();
	new LoginHandler();
	new EndHandler();
});

discordBot.login(config.get().discord.token).then(() => { if (start) { minecraftBot.connect(); } });

export { config, discordBot, minecraftBot };