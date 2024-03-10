import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class DeleteHomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "delhome",
			"description": "Executes the /delhome command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const home: string = await args.pick("string");
		minecraftBot.chat(`/delhome ${home}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}