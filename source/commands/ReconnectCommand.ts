import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

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
		minecraftBot.reconnect();
		return interaction.editReply({ "embeds": [Embeds.reconnected()] });
	}
}