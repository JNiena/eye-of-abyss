import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class LoginListener {
	public constructor() {
		minecraftBot.on("login", () => {
			minecraftBot.connected = true;
			discordBot.sendEmbed(Embeds.connected()).then();
		});
	}
}