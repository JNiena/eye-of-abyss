import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class KitCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "kit",
			"description": "Executes the /kit command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("name").setDescription("The name of the kit to get.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1226024385312325632"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const kit: string = interaction.options.getString("kit", true);
		minecraftBot.chat(`/kit ${kit}`);
		return interaction.reply({ "embeds": [Embeds.commandExecuted()] });
	}
}