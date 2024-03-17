import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class TeleportDenyCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpdeny",
			"description": "Executes the /tpdeny command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1218804231935492166"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		minecraftBot.chat("/tpdeny");
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}