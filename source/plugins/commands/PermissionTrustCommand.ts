import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class PermissionTrustCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "permissiontrust",
			"description": "Permission-trusts a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to permission-trust.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": ["1120486200428482723"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/permissiontrust ${username}`);
		return interaction.editReply({ "embeds": [this.trusted(username)] });
	}

	private trusted(username: string): APIEmbed {
		return Embeds.template("User Trusted", `\`${username}\` has been permission-trusted!`);
	}
}