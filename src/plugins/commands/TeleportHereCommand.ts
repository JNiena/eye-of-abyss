import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";

export class TeleportHereCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpahere",
			"description": "Executes the /tpahere command.",
			"preconditions": ["ValidChannel", "PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to teleport to.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1123341561250451638"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/tpahere ${username}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}