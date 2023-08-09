import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";
import { LoginListener } from "./LoginListener";

export class KickedListener {
	public constructor() {
		minecraftBot.on("kicked", (reason: string) => {
			discordBot.sendEmbed(Embeds.kicked(reason)).then();
			if (config.get().events.kicked.enable) {
				discordBot.sendEmbed(Embeds.attemptingReconnect(config.get().events.kicked.delay)).then(message => {
					LoginListener.lastMessage = message;
				});
				if (!minecraftBot.isConnected()) {
					minecraftBot.reconnect(config.get().events.kicked.delay);
				}
			}
		});
	}
}