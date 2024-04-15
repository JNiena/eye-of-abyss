import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class DeleteHomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "delhome",
			"description": "Executes the /delhome command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("name").setDescription("The name of the home to delete.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1226024386050654228"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true);
		minecraftBot.chat(`/delhome ${name}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}