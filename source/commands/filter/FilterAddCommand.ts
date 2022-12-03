import { Command } from "discord-akairo";
import { MinecraftBot } from "../../MinecraftBot";
import { Message } from "discord.js";

export class FilterAddCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-add", {
			"aliases": ["filter-add", "add"],
			"args": [{ "id": "word", "match": "content" }]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.config.get()["filter"]["list"].includes(args.word.toLowerCase())) {
			message.channel.send("**(FILTER) ALREADY ADDED").then();
		}
		else {
			this.minecraftBot.config.get()["filter"]["list"].push(args.word.toLowerCase());
			this.minecraftBot.config.save();
			message.channel.send(`**(FILTER) ADDED: "${args.word.toLowerCase()}"**`).then();
		}
	}

}