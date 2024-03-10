import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class BackCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "back",
			"description": "Executes the /back command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, _args: Args) {
		minecraftBot.chat("/back");
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}