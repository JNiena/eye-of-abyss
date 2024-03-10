import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, discordBot } from "../Main";
import { Message } from "discord.js";

export class LoggingCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "logger",
			"description": "Enables or disables the logger.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "enable", "messageRun": "messageEnable" },
				{ "name": "disable", "messageRun": "messageDisable" },
				// { "name": "path", "messageRun": "messagePath" },
			]
		});
	}

	public async messageEnable(_message: Message<boolean>) {
		config.get().logging.enable = true;
		config.save();
		return discordBot.sendEmbed(Embeds.loggerEnabled());
	}

	public async messageDisable(_message: Message<boolean>) {
		config.get().logging.enable = false;
		config.save();
		return discordBot.sendEmbed(Embeds.loggerDisabled());
	}

	/*
	public async messagePath(_message: Message<boolean>, args: Args) {
		const path: string = await args.pick("string");
		config.get().logging.path = path;
		config.save();
		return discordBot.sendEmbed(Embeds.loggerPath());
	}
	*/
}