import {MinecraftBot} from "./minecraftBot";
import {DiscordBot} from "./discordBot";
import {BotLoader} from "./botLoader";

let discordBot: DiscordBot = BotLoader.loadFromFile<DiscordBot>("config.json");
let minecraftBots: MinecraftBot[] = BotLoader.loadFromDirectory<MinecraftBot>("accounts");

for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["ingame"]["joinMessage"]);
	});
}