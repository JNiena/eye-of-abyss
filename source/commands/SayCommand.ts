import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class SayCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "say",
			"description": "Sends a message from the account."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option.setName("message").setDescription("The message for the account to send.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1094053789134245978"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const message: string = interaction.options.getString("message", true);
		minecraftBot.chat(message);
		return interaction.editReply({ "embeds": [Embeds.messageSent()] });
	}
}