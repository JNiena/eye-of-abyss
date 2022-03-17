import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class ResetCommand extends Command {

	private minecraftBots: MinecraftBot[];

	constructor(minecraftBots: MinecraftBot[]) {
		super("reset", {
			"aliases": ["reset"]
		});
		this.minecraftBots = minecraftBots;
	}

	exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			minecraftBot.config.get()["whitelist"]["filter"] = [];
			minecraftBot.config.save();
			message.reply("**The whitelist has been reset.**").then();
		});
	}

}