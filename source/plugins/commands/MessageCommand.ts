import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class MessageCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "message",
			"description": "Sends a message to a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to send the message to.")
					.setRequired(true)
					.setMinLength(1)
				)
				.addStringOption(option => option
					.setName("message")
					.setDescription("The message to send.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": ["1105624908370808914"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		const message: string = interaction.options.getString("message", true);
		minecraftBot.chat(`/msg ${username} ${message}`);
		return interaction.editReply({ "embeds": [Embeds.messageSent()] });
	}
}