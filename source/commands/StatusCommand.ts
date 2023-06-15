import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class StatusCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "status",
			"description": "Checks the status of the bot."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094053791453675550"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		if (minecraftBot.isConnected()) {
			return interaction.editReply({ "embeds": [Embeds.online()] });
		}
		return interaction.editReply({ "embeds": [Embeds.offline()] });
	}
}