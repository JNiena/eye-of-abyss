import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class StatusCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "status",
			"description": "Checks whether or not the bot is online.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>) {
		if (minecraftBot.connected) { return discordBot.sendEmbed(Embeds.online()); }
		return discordBot.sendEmbed(Embeds.offline());
	}
}