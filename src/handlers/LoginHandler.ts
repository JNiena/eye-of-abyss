import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class LoginHandler {
	public constructor() {
		minecraftBot.internal.on("login", () => {
			minecraftBot.connected = true;
			if (minecraftBot.internal.username && !config.get().credentials.username) {
				config.get().credentials.username = minecraftBot.internal.username;
				config.save();
			}
			discordBot.sendEmbed(Embeds.connected(), config.get().discord.infoChannelID).then();
		});
	}
}