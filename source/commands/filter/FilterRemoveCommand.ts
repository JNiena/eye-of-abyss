import {Command} from "discord-akairo";
import {MinecraftBot} from "../../MinecraftBot";
import {Message} from "discord.js";

export class FilterRemoveCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("filter-remove", {
			"aliases": ["filter-remove"],
			"args": [{"id": "word", "type": "lowercase"}]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		if (this.minecraftBot.config.get()["filter"]["list"].includes(args.word)) {
			this.minecraftBot.config.get()["filter"]["list"] = this.minecraftBot.config.get()["filter"]["list"].filter((element: string) => element !== args.word);
			this.minecraftBot.config.save();
			message.channel.send(`**REMOVED "${args.word}"**`).then();
		}
		else message.channel.send("**ALREADY REMOVED**").then();
	}

}