import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class KickedListener {
	public constructor() {
		minecraftBot.on("kicked", (reason: string) => {
			discordBot.sendEmbed(Embeds.kicked(reason)).then();
			if (config.get().events.kicked.enable) {
				discordBot.sendEmbed(Embeds.reconnecting(config.get().events.kicked.delay)).then();
				minecraftBot.connect(config.get().events.kicked.delay);
			}
		});
	}
}