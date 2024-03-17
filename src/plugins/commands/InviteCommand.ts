import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class InviteCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "invite",
			"description": "Executes the /team invite command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to invite.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1105624906646958080"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/team invite ${username}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}