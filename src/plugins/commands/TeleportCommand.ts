import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class TeleportCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "tpa",
			"description": "Executes the /tpa command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to teleport to.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1120486112910118984"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/tpa ${username}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}