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
		for (let i = 0; i < this.minecraftBots.length; i++) {
			let minecraftBot: MinecraftBot = this.minecraftBots[i];
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) continue;
			if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word)) {
				minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== args.word);
				minecraftBot.config.save();
				message.channel.send(`**Removed "${args.word}" from the whitelist.**`).then();
			}
			else message.channel.send("**That word isn't on the whitelist.**").then();
		}
	}

}