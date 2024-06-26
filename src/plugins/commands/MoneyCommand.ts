import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class MoneyCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "money",
			"description": "Executes the /money command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to view the money of.").setRequired(false).setMinLength(1));
		}, { "idHints": ["1226024470620409958"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const username: string = interaction.options.getString("username", false) ?? "";
		minecraftBot.chat(`/bal ${username}`);
		return interaction.reply({ "embeds": [Embeds.commandExecuted()] });
	}
}