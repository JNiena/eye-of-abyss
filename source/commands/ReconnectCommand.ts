import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class ReconnectCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "reconnect",
			"description": "Reconnects the account to the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094050995899727982"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		minecraftBot.reconnect();
		return interaction.editReply({ "embeds": [Embeds.reconnected()] });
	}
}