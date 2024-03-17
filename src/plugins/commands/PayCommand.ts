import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class PayCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "pay",
			"description": "Executes the /pay command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to pay.").setRequired(true).setMinLength(1))
				.addNumberOption(option => option.setName("amount").setDescription("The amount to send.").setRequired(true).setMinValue(1));
		}, { "idHints": ["1105624909134184539"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const username: string = interaction.options.getString("username", true);
		const amount: number = interaction.options.getNumber("amount", true);
		minecraftBot.chat(`/pay ${username} ${amount}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}