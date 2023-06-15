import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class ConnectCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "disconnect",
			"description": "Disconnects the bot from the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094053789868249128"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		if (!minecraftBot.isConnected()) {
			return interaction.editReply({ "embeds": [Embeds.alreadyDisconnected()] });
		}
		minecraftBot.disconnect(1_000);
		return interaction.editReply({ "embeds": [Embeds.attemptingDisconnect()] });
	}
}