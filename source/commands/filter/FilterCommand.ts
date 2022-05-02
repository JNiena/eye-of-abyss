import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../../MinecraftBot";

export class FilterCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter", {
			"aliases": ["filter"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		message.channel.send(this.minecraftBot.config.get()["filter"]["list"]).then();
	}

}