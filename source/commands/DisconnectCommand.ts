import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class ConnectCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "disconnect",
			// @ts-ignore
			"preconditions": ["IsValidChannel"],
			"description": "Disconnects the account from the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094053789868249128"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		if (minecraftBot.isConnected()) {
			minecraftBot.disconnect();
			return interaction.editReply({ "embeds": [Embeds.disconnected()] });
		}
		return interaction.editReply({ "embeds": [Embeds.alreadyDisconnected()] });
	}
}