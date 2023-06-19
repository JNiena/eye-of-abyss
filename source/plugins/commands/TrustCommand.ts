import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class TrustCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "trust",
			"description": "Trusts a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to trust.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": [""] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/trust ${username}`);
		return interaction.editReply({ "embeds": [this.trusted(username)] });
	}

	private trusted(username: string): APIEmbed {
		return Embeds.template("User Trusted", `\`${username}\` has been trusted!`);
	}
}