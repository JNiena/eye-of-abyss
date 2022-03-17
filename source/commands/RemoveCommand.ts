import {Message} from "discord.js";
import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";

export class RemoveCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("remove", {
			"aliases": ["remove"],
			"args": [
				{
					"id": "word",
					"type": "lowercase"
				}
			]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word)) {
				minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== args.word);
				minecraftBot.config.save();
				message.reply(`**Removed "${args.word}" from the whitelist.**`).then();
			}
			else {
				message.reply("**That word isn't on the whitelist.**").then();
			}
		});
	}

}