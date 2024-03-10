import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class PrivateWarpCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "pw",
			"description": "Executes the /pw command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const pw: string = await args.pick("string");
		minecraftBot.chat(`/pw ${pw}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}