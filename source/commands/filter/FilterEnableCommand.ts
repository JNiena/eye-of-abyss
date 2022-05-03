import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../../MinecraftBot";

export class FilterEnableCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-enable", {
			"aliases": ["filter-enable", "enable"]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBot.config.get()["filter"]["enable"] = true;
		this.minecraftBot.config.save();
		message.channel.send("**ENABLED**").then();
	}

}