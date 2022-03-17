import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class StatusCommand extends Command {

	private minecraftBots: MinecraftBot[];

	constructor(minecraftBots: MinecraftBot[]) {
		super("status", {
			"aliases": ["status"]
		});
		this.minecraftBots = minecraftBots;
	}

	exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			if (minecraftBot.isConnected()) {
				message.reply("**The bot is online.**").then();
			}
			else {
				message.reply("**The bot is offline.**").then();
			}
		});
	}

}