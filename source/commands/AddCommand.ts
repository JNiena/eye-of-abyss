import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class AddCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("add", {
			"aliases": ["add"],
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
				message.channel.send("**That word is already on the whitelist.**").then();
			}
			else {
				minecraftBot.config.get()["whitelist"]["filter"].push(args.word);
				minecraftBot.config.save();
				message.channel.send(`**Added "${args.word}" to the whitelist.**`).then();
			}
		});
	}

}