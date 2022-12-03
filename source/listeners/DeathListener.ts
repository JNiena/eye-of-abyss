import { MinecraftBot } from "../MinecraftBot";
import { DiscordBot } from "../DiscordBot";
import { Config } from "../Config";

export class DeathListener {

	public constructor(minecraftBot: MinecraftBot, discordBot: DiscordBot) {
		let config: Config = minecraftBot.config;
		let channelID: string = config.get()["discord"]["channelID"];
		minecraftBot.on("death", () => {
			discordBot.send("**(BOT) KILLED**", channelID).then();
			if (config.get()["events"]["death"]["enable"]) {
				discordBot.send(`**(BOT) RESPAWNING: ${config.get()["events"]["death"]["delay"] / 1000}s**`, channelID).then();
				minecraftBot.chat(config.get()["events"]["death"]["message"], config.get()["events"]["death"]["delay"]);
			}
		});
	}

}