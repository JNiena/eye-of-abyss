import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class AutoReconnectCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "autoreconnect",
			"description": "Manages auto-reconnection options.",
			"subcommands": [
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" }
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("enable").setDescription("Enables auto-reconnection."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables auto-reconnection."));
		}, { "idHints": ["1120099283958501436"] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().events.disconnect.reconnect = true;
		config.save();
		return interaction.reply({ "embeds": [Embeds.autoReconnectEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().events.disconnect.reconnect = false;
		config.save();
		return interaction.reply({ "embeds": [Embeds.autoReconnectDisabled()] });
	}
}