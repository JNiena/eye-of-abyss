import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../../MinecraftBot";

export class FilterListCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-list", {
			"aliases": ["filter-list", "filter", "list"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		message.channel.send(`**FILTER:** ${this.minecraftBot.config.get()["filter"]["list"].join().replace("\n", ", ")}`).then();
	}

}