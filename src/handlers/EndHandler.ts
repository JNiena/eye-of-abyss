import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";
import { MinecraftBot } from "../MinecraftBot";

export class EndHandler {
	public constructor() {
		minecraftBot.internal.on("end", () => {
			minecraftBot.connected = false;
			if (minecraftBot.lastLog) {
				discordBot.sendEmbed(Embeds.disconnected(MinecraftBot.username, minecraftBot.lastLog), config.get().discord.infoChannelID).then();
				minecraftBot.lastLog = undefined;
				return;
			}
			discordBot.sendEmbed(Embeds.disconnected(MinecraftBot.username), config.get().discord.infoChannelID).then();
		});
	}
}