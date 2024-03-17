import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class HomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "home",
			"description": "Executes the /home command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("name").setDescription("The name of the home to teleport to.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1218804060639989821"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const name: string = interaction.options.getString("name", true);
		minecraftBot.chat(`/home ${name}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}