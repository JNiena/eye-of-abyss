import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { config, discordBot, minecraftBot } from "../Main";

export class DisconnectCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "disconnect",
			"description": "Disconnects the bot from the server.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>) {
		if (!minecraftBot.connected) { return discordBot.sendEmbed(Embeds.alreadyDisconnected()); }
		config.get().events.disconnect.reconnect = false;
		minecraftBot.disconnect();
	}
}