import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class HomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "home",
			"description": "Executes the /home command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const home: string = await args.pick("string").catch(() => "");
		minecraftBot.chat(`/home ${home}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}