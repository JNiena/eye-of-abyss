import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class TeleportCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpa",
			"description": "Executes the /tpa command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const username: string = await args.pick("string");
		minecraftBot.chat(`/tpa ${username}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}