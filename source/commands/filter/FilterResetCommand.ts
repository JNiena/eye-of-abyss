import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../../MinecraftBot";

export class FilterResetCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-reset", {
			"aliases": ["filter-reset", "reset"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBot.config.get()["filter"]["list"] = [];
		this.minecraftBot.config.save();
		message.channel.send("**RESET**").then();
	}

}