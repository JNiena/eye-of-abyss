import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class DisconnectCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "disconnect",
			"description": "Disconnects the bot from the server."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1226024557131989104"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.alreadyDisconnected()] }); }
		config.get().autoreconnect.enable = false;
		minecraftBot.disconnect();
		return interaction.reply({ "embeds": [Embeds.disconnected()] });
	}
}