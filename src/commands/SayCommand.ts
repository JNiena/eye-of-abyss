import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class SayCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "say",
			"description": "Sends a message from the bot.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("message").setDescription("The message that the bot will send.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1094053789134245978"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.editReply({ "embeds": [Embeds.offline()] }); }
		const message: string = interaction.options.getString("message", true);
		minecraftBot.chat(message);
		return interaction.editReply({ "embeds": [Embeds.messageSent()] });
	}
}