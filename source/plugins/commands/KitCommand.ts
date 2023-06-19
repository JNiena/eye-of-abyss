import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class KitCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "kit",
			"description": "Acquires a kit."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("kit")
					.setDescription("The kit to receive.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": ["1120486114919198751"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const kit: string = interaction.options.getString("kit", true);
		minecraftBot.chat(`/kit ${kit}`);
		return interaction.editReply({ "embeds": [this.kitReceived(kit)] });
	}

	private kitReceived(kit: string): APIEmbed {
		return Embeds.template("Kit Received", `Kit \`${kit}\` has been received!`);
	}
}