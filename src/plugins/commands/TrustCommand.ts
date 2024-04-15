import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class TrustCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "trust",
			"description": "Executes the /trust command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to trust.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1226024387548024893"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/trust ${username}`);
		return interaction.reply({ "embeds": [Embeds.commandExecuted()] });
	}
}