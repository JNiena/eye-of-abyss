import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class EndListener {
	public constructor() {
		minecraftBot.on("end", () => {
			minecraftBot.connected = false;
			discordBot.sendEmbed(Embeds.disconnected()).then();
		});
	}
}