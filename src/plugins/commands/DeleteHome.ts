import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class DeleteHomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "delhome",
			"description": "Executes the /delhome command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("name").setDescription("The name of the home to delete.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1218804146472222731"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const name: string = interaction.options.getString("name", true);
		minecraftBot.chat(`/delhome ${name}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}