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
				{ "name": "disable", "chatInputRun": "chatInputDisable" },
				{ "name": "interval", "chatInputRun": "chatInputInterval" },
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("enable").setDescription("Enables auto-reconnection."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables auto-reconnection."))
				.addSubcommand(command => command.setName("interval").setDescription("Changes the auto-reconnection interval.")
					.addNumberOption(option => option.setName("interval").setDescription("The interval in seconds.").setRequired(true).setMinValue(60)));
		}, { "idHints": ["1226024641626247188"] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().autoreconnect.enable = true;
		config.save();
		return interaction.reply({ "embeds": [Embeds.autoReconnectEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().autoreconnect.enable = false;
		config.save();
		return interaction.reply({ "embeds": [Embeds.autoReconnectDisabled()] });
	}

	public async chatInputInterval(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const interval: number = interaction.options.getNumber("interval", true);
		config.get().autoreconnect.interval = interval * 1000;
		config.save();
		return interaction.reply({ "embeds": [Embeds.autoReconnectIntervalSet()] });
	}
}