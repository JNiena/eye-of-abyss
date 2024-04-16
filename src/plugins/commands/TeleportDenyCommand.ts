import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class TeleportDenyCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpdeny",
			"description": "Executes the /tpdeny command.",
			"preconditions": ["PluginEnabled"]
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1226024302009385103"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		minecraftBot.chat("/tpdeny");
		return interaction.reply({ "embeds": [Embeds.commandExecuted()] });
	}
}