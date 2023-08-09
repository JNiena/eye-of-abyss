import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";
import { LoginListener } from "./LoginListener";

export class ErrorListener {
	public constructor() {
		minecraftBot.on("error", (error: Error) => {
			discordBot.sendEmbed(Embeds.error(error.message)).then();
			if (config.get().events.error.enable) {
				discordBot.sendEmbed(Embeds.attemptingReconnect(config.get().events.error.delay)).then(message => {
					LoginListener.lastMessage = message;
				});
				if (!minecraftBot.isConnected()) {
					minecraftBot.reconnect(config.get().events.error.delay);
				}
			}
		});
	}
}