import { Command } from "discord-akairo";
import { MinecraftBot } from "../MinecraftBot";
import { Message } from "discord.js";

export class DisconnectCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("disconnect", {
			"aliases": ["disconnect"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.isConnected()) {
			this.minecraftBot.disconnect();
			message.channel.send("**(BOT) DISCONNECTED**").then();
		}
		else {
			message.channel.send("**(BOT) ALREADY DISCONNECTED**").then();
		}
	}

}