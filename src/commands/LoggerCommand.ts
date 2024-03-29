import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class LoggingCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "logger",
			"description": "Enables or disables the logger.",
			"subcommands": [
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" }
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("enable").setDescription("Enables the logger."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables the logger."));
		}, { "idHints": ["1218760387269230602"] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().logging.enable = true;
		config.save();
		return interaction.reply({ "embeds": [Embeds.loggerEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().logging.enable = false;
		config.save();
		return interaction.reply({ "embeds": [Embeds.loggerDisabled()] });
	}

}