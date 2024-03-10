import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class PayCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "pay",
			"description": "Executes the /pay command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const username: string = await args.pick("string");
		const amount: number = await args.pick("integer");
		minecraftBot.chat(`/pay ${username} ${amount}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}