import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MinecraftBot } from "../MinecraftBot";

export class SayCommand extends Command {

	private minecraftBot: MinecraftBot;

	public constructor(minecraftBot: MinecraftBot) {
		super("say", {
			"aliases": ["say"],
			"args": [{ "id": "message", "match": "content" }]
		});
		this.minecraftBot = minecraftBot;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBot.chat(args.message);
	}

}