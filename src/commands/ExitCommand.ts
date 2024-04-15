import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { exit } from "process";
import { config } from "../Main";

export class ExitCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "exit",
			"description": "Exits the program after ten seconds."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1226024557899550833"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		setTimeout(() => exit(), 10_000);
		return interaction.reply({ "embeds": [Embeds.exiting()] });
	}
}