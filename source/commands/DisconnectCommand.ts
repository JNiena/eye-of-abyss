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
		for (let i = 0; i < this.minecraftBots.length; i++) {
			let minecraftBot: MinecraftBot = this.minecraftBots[i];
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) continue;
			if (minecraftBot.isConnected()) {
				minecraftBot.disconnect();
				message.channel.send("**Successfully disconnected.**").then();
			}
			else message.channel.send("**The bot is already disconnected.**").then();
		}
	}

}