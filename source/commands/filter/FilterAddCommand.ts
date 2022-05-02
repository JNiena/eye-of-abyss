import {Command} from "discord-akairo";
import {MinecraftBot} from "../../MinecraftBot";
import {Message} from "discord.js";

export class FilterAddCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-add", {
			"aliases": ["filter-add"],
			"args": [{"id": "word", "type": "lowercase"}
			]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.config.get()["filter"]["list"].includes(args.word)) message.channel.send("**ALREADY EXISTS").then();
		else {
			this.minecraftBot.config.get()["filter"]["list"].push(args.word);
			this.minecraftBot.config.save();
			message.channel.send(`ADDED "${args.word}"`).then();
		}
	}

}