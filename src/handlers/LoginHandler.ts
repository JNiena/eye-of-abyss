import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class LoginHandler {
	public constructor() {
		minecraftBot.internal.on("login", () => {
			minecraftBot.connected = true;
			discordBot.sendEmbed(Embeds.connected(), config.get().discord.infoChannelID).then();
		});
	}
}