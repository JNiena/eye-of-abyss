import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";
import { MinecraftBot } from "../MinecraftBot";

export class LoginHandler {
	public constructor() {
		minecraftBot.internal.on("login", () => {
			minecraftBot.connected = true;
			if (!MinecraftBot.username) { MinecraftBot.username = minecraftBot.internal.username; }
			discordBot.sendEmbed(Embeds.connected(MinecraftBot.username), config.get().discord.infoChannelID).then();
		});
	}
}