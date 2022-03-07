import {MinecraftBot} from "./minecraftBot";
import {DiscordBot} from "./discordBot";
import {Config} from "./config";
import {Files} from "./files";

let discordBot: DiscordBot = new DiscordBot(new Config(Files.read("config.json")));
let minecraftBots: MinecraftBot[] = [];

let minecraftBotConfigs: string[] = Files.readAll("accounts");
for (let i = 0; i < minecraftBotConfigs.length; i++) {
	minecraftBots.push(new MinecraftBot(new Config(minecraftBotConfigs[i])));
}

discordBot.login();

for (let i = 0; i < minecraftBots.length; i++) {
	let minecraftBot = minecraftBots[i];
	minecraftBot.onFirstSpawn(() => {
		minecraftBot.chat(minecraftBot.config.get()["ingame"]["joinMessage"]);
	});
	minecraftBot.onChat((username, message) => {
		discordBot.message(username + " : " + message.toString(), minecraftBot.config.get()["discord"]["channelID"]);
	});
}