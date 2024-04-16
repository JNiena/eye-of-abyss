import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class HomeCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "home",
			"description": "Executes the /home command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("name").setDescription("The name of the home to teleport to.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1226024199051808869"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true);
		minecraftBot.chat(`/home ${name}`);
		return interaction.reply({ "embeds": [Embeds.commandExecuted()] });
	}
}