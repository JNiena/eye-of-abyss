import { ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class LoginListener {
	public static lastInteraction: ChatInputCommandInteraction | null;
	public static lastMessage: Message | null;
	private static firstConnect: boolean = true;

	public constructor() {
		minecraftBot.on("login", () => {
			if (LoginListener.firstConnect) {
				discordBot.sendEmbed(Embeds.connected()).then();
			}
			LoginListener.firstConnect = false;
			minecraftBot.connected = true;
			if (LoginListener.lastInteraction) {
				LoginListener.lastInteraction.editReply({ "embeds": [Embeds.connected()] }).then();
				LoginListener.lastInteraction = null;
			}
			if (LoginListener.lastMessage) {
				LoginListener.lastMessage.edit({ embeds: [Embeds.connected()] }).then();
				LoginListener.lastMessage = null;
			}
		});
	}
}