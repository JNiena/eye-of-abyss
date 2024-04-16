import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class DeathHandler {
	public constructor() {
		minecraftBot.internal.on("death", () => { discordBot.sendEmbed(Embeds.death(), config.get().discord.infoChannelID); });
	}
}