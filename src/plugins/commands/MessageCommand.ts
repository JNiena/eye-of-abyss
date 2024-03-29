import { Command } from "@sapphire/framework";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";

export class MessageCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "message",
			"description": "Executes the /msg command.",
			"preconditions": ["PluginEnabled"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addStringOption(option => option.setName("username").setDescription("The username of the player to send a message to.").setRequired(true).setMinLength(1))
				.addStringOption(option => option.setName("message").setDescription("The message to send.").setRequired(true).setMinLength(1));
		}, { "idHints": ["1105624908370808914"] });
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const username: string = interaction.options.getString("username", true);
		const message: string = interaction.options.getString("message", true);
		minecraftBot.chat(`/msg ${username} ${message}`);
		return interaction.editReply({ "embeds": [Embeds.commandExecuted()] });
	}
}