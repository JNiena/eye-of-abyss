import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class ConnectCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "connect",
			"description": "Connects the bot to the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1226024474009403534"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.alreadyConnected()] }); }
		config.get().autoreconnect.enable = true;
		minecraftBot.connect();
		return interaction.reply({ "embeds": [Embeds.attemptedConnection()] });
	}
}