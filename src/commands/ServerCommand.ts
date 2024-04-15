import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class ServerCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "server",
			"description": "Configures the host, port, and version the bot connects with.",
			"subcommands": [
				{ "name": "host", "chatInputRun": "chatInputHost" },
				{ "name": "port", "chatInputRun": "chatInputPort" },
				{ "name": "version", "chatInputRun": "chatInputVersion" },
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("host").setDescription("Sets the host the bot connects to.")
					.addStringOption(option => option.setName("host").setDescription("The host.").setRequired(true).setMinLength(1)))
				.addSubcommand(command => command.setName("port").setDescription("Sets the port the bot connects to.")
					.addStringOption(option => option.setName("port").setDescription("The port.").setRequired(true).setMinLength(1)))
				.addSubcommand(command => command.setName("version").setDescription("Sets the version the bot connects to.")
					.addStringOption(option => option.setName("version").setDescription("The version.").setRequired(true).setMinLength(1)));
		}, { "idHints": ["1226024642565767261"] });
	}

	public async chatInputHost(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const host: string = interaction.options.getString("host", true);
		config.get().server.host = host;
		config.save();
		return interaction.reply({ "embeds": [Embeds.hostSet()] });
	}

	public async chatInputPort(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const port: string = interaction.options.getString("port", true);
		config.get().server.port = port;
		config.save();
		return interaction.reply({ "embeds": [Embeds.portSet()] });
	}

	public async chatInputVersion(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const version: string = interaction.options.getString("version", true);
		config.get().server.version = version;
		config.save();
		return interaction.reply({ "embeds": [Embeds.versionSet()] });
	}
}