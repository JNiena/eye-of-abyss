import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class KitCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "kit",
			"description": "Executes the /kit command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const kit: string = await args.pick("string");
		minecraftBot.chat(`/kit ${kit}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}