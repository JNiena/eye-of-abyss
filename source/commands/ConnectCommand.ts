import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class ConnectCommand extends Command {

	private minecraftBots: MinecraftBot[];
	private setupBehavior: Function;

	public constructor(minecraftBots: MinecraftBot[], setupBehavior: Function) {
		super("connect", {
			"aliases": ["connect"]
		});
		this.minecraftBots = minecraftBots;
		this.setupBehavior = setupBehavior;
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
				this.setupBehavior(minecraftBot);
			}
		});
	}

}