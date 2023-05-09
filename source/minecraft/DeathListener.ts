import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class DeathListener {
	public constructor() {
		minecraftBot.on("death", () => {
			discordBot.sendEmbed(Embeds.death()).then();
			if (config.get().events.death.enable) {
				discordBot.sendEmbed(Embeds.respawning(config.get().events.death.delay)).then();
				minecraftBot.chat(config.get().events.death.message, config.get().events.death.delay);
			}
		});
	}
}