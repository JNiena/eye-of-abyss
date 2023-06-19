import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class GivetagCommand extends PluginCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "givetag",
			"description": "Gives the Abyss tag to a player."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => option
					.setName("username")
					.setDescription("The username of the player to give the tag to.")
					.setRequired(true)
					.setMinLength(1)
				);
		}, { "idHints": ["1120486204010397696"] });
	}

	public override setup(): void {}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const username: string = interaction.options.getString("username", true);
		minecraftBot.chat(`/giveabysstag1 ${username}`);
		return interaction.editReply({ "embeds": [this.tagGiven(username)] });
	}

	private tagGiven(username: string): APIEmbed {
		return Embeds.template("Tag Given", `The tag has been given to \`${username}\`!`);
	}
}