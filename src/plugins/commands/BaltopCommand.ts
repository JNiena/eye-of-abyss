import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class BaltopCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "baltop",
			"description": "Executes the /baltop command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const page: number = await args.pick("integer").catch(() => 1);
		minecraftBot.chat(`/baltop ${page}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}