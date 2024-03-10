import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class SayCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "say",
			"description": "Sends a message from the bot.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		if (!minecraftBot.connected) { return discordBot.sendEmbed(Embeds.offline()); }
		const toSend: string = await args.rest("string");
		minecraftBot.chat(toSend);
		return discordBot.sendEmbed(Embeds.messageSent());
	}
}