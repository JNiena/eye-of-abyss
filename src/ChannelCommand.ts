import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { config } from "./Main";

export abstract class ChannelCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, options);
	}

	public abstract run(interaction: ChatInputCommandInteraction): Promise<Message>;

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (ChannelCommand.isCorrectChannel(interaction)) {
			await this.run(interaction);
		}
	}

	public static isCorrectChannel(interaction: ChatInputCommandInteraction): boolean {
		return config.get().discord.channelID === interaction.channelId;
	}
}