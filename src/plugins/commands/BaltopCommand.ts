import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class BaltopCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "baltop",
			"description": "Executes the /baltop command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addIntegerOption(option => option.setName("page").setDescription("The page of baltop to view.").setRequired(false).setMinValue(1));
		}, { "idHints": ["1226024299299602472"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const page: number = interaction.options.getInteger("page", false) ?? 1;
		minecraftBot.chat(`/baltop ${page}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}