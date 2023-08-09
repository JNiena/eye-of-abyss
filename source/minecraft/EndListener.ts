import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class EndListener {
	public static lastInteraction: ChatInputCommandInteraction | null;

	public constructor() {
		minecraftBot.on("end", () => {
			minecraftBot.connected = false;
			if (EndListener.lastInteraction) {
				EndListener.lastInteraction.editReply({ "embeds": [Embeds.disconnected()] }).then();
				EndListener.lastInteraction = null;
			}
		});
	}
}