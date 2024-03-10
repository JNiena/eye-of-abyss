import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class ConnectCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "connect",
			"description": "Connects the bot to the server.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>) {
		if (minecraftBot.connected) { return discordBot.sendEmbed(Embeds.alreadyConnected()); }
		config.get().events.disconnect.reconnect = true;
		minecraftBot.connect();
	}
}