import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class TeleportAcceptCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpaccept",
			"description": "Accepts a teleportation request."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": [""] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		minecraftBot.chat("/tpaccept");
		return interaction.editReply({ "embeds": [this.teleportAccepted()] });
	}

	private teleportAccepted(): APIEmbed {
		return Embeds.template("TPA Accepted", "A teleportation request has been accepted!");
	}
}