import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class JoinListener {
	public constructor() {
		minecraftBot.once("spawn", () => {
			discordBot.sendEmbed(Embeds.connected()).then();
			if (config.get().events.join.enable) {
				minecraftBot.chat(config.get().events.join.message, config.get().events.join.delay);
			}
		});
	}
}