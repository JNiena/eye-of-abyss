import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class WarpCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "warp",
			"description": "Executes the /warp command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const warp: string = await args.pick("string");
		minecraftBot.chat(`/warp ${warp}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}