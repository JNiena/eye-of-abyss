import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {MinecraftBot} from "../MinecraftBot";

export class ListCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("list", {
			"aliases": ["list"]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			message.reply(`**Whitelist: ${minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ")}.**`).then();
		});
	}

}