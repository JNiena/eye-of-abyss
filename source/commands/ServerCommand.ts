import { Args } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, discordBot } from "../Main";
import { Message } from "discord.js";

export class ServerCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "server",
			"description": "Configures the host, port, and version the bot connects with.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "host", "messageRun": "messageHost" },
				{ "name": "port", "messageRun": "messagePort" },
				{ "name": "version", "messageRun": "messageVersion" },
			]
		});
	}

	public async messageHost(_message: Message<boolean>, args: Args) {
		const host: string = await args.pick("string");
		config.get().server.host = host;
		config.save();
		return discordBot.sendEmbed(Embeds.hostSet());
	}

	public async messagePort(_message: Message<boolean>, args: Args) {
		const port: string = await args.pick("string");
		config.get().server.port = port;
		config.save();
		return discordBot.sendEmbed(Embeds.portSet());
	}

	public async messageVersion(_message: Message<boolean>, args: Args) {
		const version: string = await args.pick("string");
		config.get().server.version = version;
		config.save();
		return discordBot.sendEmbed(Embeds.versionSet());
	}
}