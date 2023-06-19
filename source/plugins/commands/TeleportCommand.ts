import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class TeleportCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpa",
			"description": "Sends a teleportation request to a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to send a teleportation request to.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": [""] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/tpa ${username}`);
		return interaction.editReply({ "embeds": [this.tagTaken(username)] });
	}

	private tagTaken(username: string): APIEmbed {
		return Embeds.template("TPA Sent", `A teleportation request has been sent to \`${username}\`!`);
	}
}