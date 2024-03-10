import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot } from "../Main";
import { commands } from "../CommandInfo";

export class HelpCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "help",
			"description": "Displays a list of commands, their usage, and what they do.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const command: string = await args.pick("string").catch(() => "all");
		if (command === "all") { return discordBot.sendEmbed(Embeds.helpList(commands)); }
		if (!commands.includes(command)) { return discordBot.sendEmbed(Embeds.commandNotFound()); }
		return discordBot.sendEmbed(Embeds.helpInfo(command));
	}
}