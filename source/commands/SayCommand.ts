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
					"type": "string"
				}
			]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			minecraftBot.chat(args.message);
		});
	}

}