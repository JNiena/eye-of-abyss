import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class MessageCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "message",
			"aliases": ["msg"],
			"description": "Executes the /msg command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		const username: string = await args.pick("string");
		const toSend: string = await args.rest("string");
		minecraftBot.chat(`/msg ${username} ${toSend}`);
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}