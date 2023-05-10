import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class ConnectCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "connect",
			"description": "Connects the account to the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094053790623215729"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		if (minecraftBot.isConnected()) {
			return interaction.editReply({ "embeds": [Embeds.alreadyConnected()] });
		}
		minecraftBot.connect();
		return interaction.editReply({ "embeds": [Embeds.connected()] });
	}
}