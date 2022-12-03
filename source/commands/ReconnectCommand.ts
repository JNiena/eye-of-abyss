import { Command } from "discord-akairo";
import { MinecraftBot } from "../MinecraftBot";
import { Message } from "discord.js";

export class ReconnectCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("reconnect", {
			"aliases": ["reconnect"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBot.reconnect();
		message.channel.send("**(BOT) RECONNECTED**").then();
	}

}