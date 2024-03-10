import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class BalanceCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "balance",
			"aliases": ["bal", "money"],
			"description": "Executes the /balance command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const user: string = await args.pick("string").catch(() => "");
		minecraftBot.chat(`/bal ${user}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}