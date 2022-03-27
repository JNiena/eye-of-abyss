import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../MinecraftBot";

export class SayCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("say", {
			"aliases": ["say"],
			"args": [
				{
					"id": "message",
					"match": "content"
				}
			]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		for (let i = 0; i < this.minecraftBots.length; i++) {
			let minecraftBot: MinecraftBot = this.minecraftBots[i];
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) continue;
			minecraftBot.chat(args.message);
		}
	}

}