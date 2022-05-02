import {MinecraftBot} from "../MinecraftBot";
import {DiscordBot} from "../DiscordBot";
import {Config} from "../Config";

export class SpawnedListener {

	public constructor(minecraftBot: MinecraftBot, discordBot: DiscordBot) {
		let config: Config = minecraftBot.config;
		let channelID: string = config.get()["discord"]["channelID"];

		minecraftBot.once("spawn", () => {
			discordBot.send("**CONNECTED**", channelID).then();
			if (config.get()["events"]["join"]["enable"]) {
				minecraftBot.chat(config.get()["events"]["join"]["message"], config.get()["events"]["join"]["delay"]);
			}
		});
	}

}