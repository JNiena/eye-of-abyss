import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class StatusCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("status", {
			"aliases": ["status"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.isConnected()) message.channel.send("**ONLINE**").then();
		else message.channel.send("**OFFLINE**").then();
	}

}