import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class BackCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "back",
			"description": "Executes the /back command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1120486196360003725"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		minecraftBot.chat("/back");
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}