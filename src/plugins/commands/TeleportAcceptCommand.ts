import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class TeleportAcceptCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpaccept",
			"description": "Executes the /tpaccept command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}, { "idHints": ["1120486114139066398"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		minecraftBot.chat("/tpaccept");
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}