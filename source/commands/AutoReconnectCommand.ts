import { Command } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ChannelSubcommand } from "../ChannelSubcommand";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class AutoReconnectCommand extends ChannelSubcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "autoreconnect",
			"description": "Manages the auto-reconnection options.",
			"subcommands": [
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" }
			]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand(command => command
					.setName("enable")
					.setDescription("Enables the auto-reconnection.")
				)
				.addSubcommand(command => command
					.setName("disable")
					.setDescription("Disables the auto-reconnection.")
				);
		}, { "idHints": ["1120099283958501436"] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		config.get().events.error.enable = true;
		config.get().events.kicked.enable = true;
		config.get().save();
		return interaction.editReply({ "embeds": [Embeds.autoReconnectEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		config.get().events.error.enable = false;
		config.get().events.kicked.enable = false;
		config.get().save();
		return interaction.editReply({ "embeds": [Embeds.autoReconnectDisabled()] });
	}
}