import { Subcommand } from "@sapphire/plugin-subcommands";
import { ChatInputCommandInteraction } from "discord.js";
import { config } from "./Main";

export abstract class ChannelSubcommand extends Subcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, options);
	}

	protected isCorrectChannel(interaction: ChatInputCommandInteraction): boolean {
		return config.get().discord.channelID === interaction.channelId;
	}
}