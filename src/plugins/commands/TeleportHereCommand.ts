import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class TeleportCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpahere",
			"description": "Executes the /tpahere command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const username: string = await args.pick("string");
		minecraftBot.chat(`/tpahere ${username}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}