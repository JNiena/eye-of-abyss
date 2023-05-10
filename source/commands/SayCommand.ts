import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class SayCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "say",
			"description": "Sends a message from the account."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option.setName("message").setDescription("The message for the account to send.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1094053789134245978"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		const message: string = interaction.options.getString("message", true);
		minecraftBot.chat(message);
		return interaction.editReply({ "embeds": [Embeds.messageSent()] });
	}
}