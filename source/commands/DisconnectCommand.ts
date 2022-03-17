import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class DisconnectCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("disconnect", {
			"aliases": ["disconnect"]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			if (minecraftBot.isConnected()) {
				minecraftBot.disconnect();
				message.reply("**Successfully disconnected.**").then();
			}
			else {
				message.reply("**The bot is already disconnected.**").then();
			}
		});
	}

}