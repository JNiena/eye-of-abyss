import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class ConnectCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("connect", {
			"aliases": ["connect"]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		this.minecraftBots.forEach(minecraftBot => {
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) return;
			if (minecraftBot.isReconnecting()) {
				message.reply("**The bot is already attempting to reconnect, please wait.**").then();
			}
			else if (minecraftBot.isConnected()) {
				message.reply("**The bot is already connected.**").then();
			}
			else {
				minecraftBot.connect();
			}
		});
	}

}