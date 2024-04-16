import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class LoginHandler {
	private canSend: boolean;

	public constructor() {
		this.canSend = true;
		minecraftBot.internal.on("login", () => {
			minecraftBot.connected = true;
			if (minecraftBot.internal.username && !config.get().credentials.username) {
				config.get().credentials.username = minecraftBot.internal.username;
				config.save();
			}
			if (this.canSend) {
				this.canSend = false;
				discordBot.sendEmbed(Embeds.connected(), config.get().discord.infoChannelID);
				setTimeout(() => { this.canSend = true; }, 30_000);
			}
		});
	}
}