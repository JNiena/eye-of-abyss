import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class BaltopCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "baltop",
			"description": "Shows the baltop of the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption(option => option
					.setName("page")
					.setDescription("The page of baltop to show.")
					.setRequired(false)
					.setMinValue(1)
				);
		}, { "idHints": ["1120486112054481017"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const page: number | null = interaction.options.getInteger("page", false);
		minecraftBot.chat(`/baltop ${page ? page : 1}`);
		return interaction.editReply({ "embeds": [this.baltopShown(page ? page : 1)] });
	}

	private baltopShown(page: number): APIEmbed {
		return Embeds.template("Baltop Shown", `Page ${page} of baltop has been shown!`);
	}
}