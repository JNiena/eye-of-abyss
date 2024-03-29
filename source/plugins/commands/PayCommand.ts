import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class PayCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "pay",
			"description": "Pays money to a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to send the money to.")
					.setRequired(true)
					.setMinLength(1)
				)
				.addIntegerOption(option => option
					.setName("amount")
					.setDescription("The amount of money to send.")
					.setRequired(true)
					.setMinValue(1)
				);
		}, { "idHints": ["1105624909134184539"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		const amount: number = interaction.options.getInteger("amount", true);
		minecraftBot.chat(`/pay ${username} ${amount}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}