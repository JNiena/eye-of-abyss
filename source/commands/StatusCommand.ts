import { ChatInputCommand, Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class StatusCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "status",
			"description": "Checks the status of the account."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094053791453675550"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction, context: ChatInputCommand.RunContext) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		if (minecraftBot.isConnected()) {
			return interaction.editReply({ "embeds": [Embeds.online()] });
		}
		return interaction.editReply({ "embeds": [Embeds.offline()] });
	}
}