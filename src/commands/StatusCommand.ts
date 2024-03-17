import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class StatusCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "status",
			"description": "Checks whether or not the bot is online.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1094053791453675550"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.online()] }); }
		return interaction.reply({ "embeds": [Embeds.offline()] });
	}
}