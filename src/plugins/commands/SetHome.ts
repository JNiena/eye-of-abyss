import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class SetHomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "sethome",
			"description": "Executes the /sethome command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const home: string = await args.pick("string");
		minecraftBot.chat(`/sethome ${home}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}