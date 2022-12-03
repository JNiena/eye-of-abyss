import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MinecraftBot } from "../../MinecraftBot";

export class FilterDisableCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-disable", {
			"aliases": ["filter-disable", "disable"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBot.config.get()["filter"]["enable"] = false;
		this.minecraftBot.config.save();
		message.channel.send("**(FILTER) DISABLED**").then();
	}

}