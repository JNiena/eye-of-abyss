import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class ErrorListener {
	public constructor() {
		minecraftBot.on("error", (error: Error) => {
			discordBot.sendEmbed(Embeds.error(error.message)).then();
			if (config.get().events.error.enable) {
				discordBot.sendEmbed(Embeds.attemptingReconnect(config.get().events.error.delay)).then();
				minecraftBot.reconnect(config.get().events.error.delay);
			}
		});
	}
}