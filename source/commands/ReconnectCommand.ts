import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";
import { LoginListener } from "../minecraft/LoginListener";

export class ReconnectCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "reconnect",
			"description": "Reconnects the bot to the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094050995899727982"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		LoginListener.lastInteraction = interaction;
		minecraftBot.reconnect(1_000);
		return interaction.editReply({ "embeds": [Embeds.attemptingReconnect()] });
	}
}