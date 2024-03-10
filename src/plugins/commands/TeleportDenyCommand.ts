import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { discordBot, minecraftBot } from "../../Main";

export class TeleportDenyCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpaccept",
			"description": "Executes the /tpaccept command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override async messageRun(_message: Message<boolean>, _args: Args) {
		minecraftBot.chat("/tpdeny");
		discordBot.sendEmbed(Embeds.commandExecuted());
	}
}