import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class CoinPayCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "coinpay",
			"description": "Pays coins to a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to send the coins to.")
					.setRequired(true)
					.setMinLength(1)
				)
				.addIntegerOption(option => option
					.setName("amount")
					.setDescription("The amount of coins to send.")
					.setRequired(true)
					.setMinValue(1)
				);
		}, { "idHints": ["1105624909859803219"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		const amount: number = interaction.options.getInteger("amount", true);
		minecraftBot.chat(`/coin pay ${username} ${amount}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}