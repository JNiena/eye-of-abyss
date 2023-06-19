import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class TaketagCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "taketag",
			"description": "Takes the Abyss tag away from a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to take the tag away from.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": ["1120486110410326068"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/takeabysstag1 ${username}`);
		return interaction.editReply({ "embeds": [this.tagTaken(username)] });
	}

	private tagTaken(username: string): APIEmbed {
		return Embeds.template("Tag Taken", `The tag has been taken from \`${username}\`!`);
	}
}