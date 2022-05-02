import {MinecraftBot} from "../MinecraftBot";
import {DiscordBot} from "../DiscordBot";
import {Config} from "../Config";

export class KickedListener {

	public constructor(minecraftBot: MinecraftBot, discordBot: DiscordBot) {
		let config: Config = minecraftBot.config;
		let channelID: string = config.get()["discord"]["channelID"];
		let roleID: string = config.get()["discord"]["roleID"];

		minecraftBot.on("kicked", (reason: string) => {
			discordBot.send(`<@&${roleID}> **DISCONNECTED: ${reason}**`, channelID).then();
			if (config.get()["rejoin"]["enable"]) {
				discordBot.send(`**RECONNECTING: ${config.get()["rejoin"]["delay"] / 1000}s**`, channelID).then();
				minecraftBot.connect(config.get()["rejoin"]["delay"]);
			}
		});
	}

}