import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, discordBot } from "../Main";
import { Message } from "discord.js";

export class AutoReconnectCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "autoreconnect",
			"description": "Manages the auto-reconnection options.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "enable", "messageRun": "messageEnable" },
				{ "name": "disable", "messageRun": "messageDisable" },
				// { "name": "path", "messageRun": "messagePath" },
			]
		});
	}

	public async messageEnable(_message: Message<boolean>) {
		config.get().events.disconnect.reconnect = true;
		config.save();
		return discordBot.sendEmbed(Embeds.autoReconnectEnabled());
	}

	public async messageDisable(_message: Message<boolean>) {
		config.get().events.disconnect.reconnect = false;
		config.save();
		return discordBot.sendEmbed(Embeds.autoReconnectDisabled());
	}
}