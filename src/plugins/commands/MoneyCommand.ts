import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class MoneyCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "money",
			"description": "Executes the /money command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to view the money of.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1222024738331951254"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/bal ${username}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}