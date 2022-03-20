import {Command} from "discord-akairo";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class DisableCommand extends Command {

	private minecraftBots: MinecraftBot[];

	public constructor(minecraftBots: MinecraftBot[]) {
		super("disable", {
			"aliases": ["disable"]
		});
		this.minecraftBots = minecraftBots;
	}

	public exec(message: Message, args: any): any {
		for (let i = 0; i < this.minecraftBots.length; i++) {
			let minecraftBot: MinecraftBot = this.minecraftBots[i];
			if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"]) continue;
			minecraftBot.config.get()["whitelist"]["enabled"] = false;
			minecraftBot.config.save();
			message.channel.send("**Whitelist disabled.**").then();
		}
	}

}