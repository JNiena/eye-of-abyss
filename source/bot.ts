import {MinecraftBot} from "./minecraftbot";
import {DiscordBot} from "./discordbot";
import {Botloader} from "./botloader";

let discordBot: DiscordBot = Botloader.loadFromFile<DiscordBot>("config.json");
let minecraftBots: MinecraftBot[] = Botloader.loadFromDirectory<MinecraftBot>("accounts");

for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
	});
}