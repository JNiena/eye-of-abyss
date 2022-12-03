import { Command } from "discord-akairo";
import { MinecraftBot } from "../MinecraftBot";
import { Message, TextChannel } from "discord.js";

export class ConnectCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("connect", {
			"aliases": ["connect"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.isConnected()) {
			message.channel.send("**(BOT) ALREADY CONNECTED**").then();
		}
		else {
			this.minecraftBot.connect();
		}
	}

}