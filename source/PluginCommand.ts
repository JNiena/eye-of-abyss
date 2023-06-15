import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { config } from "./Main";

export abstract class PluginCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, options);
		if (this.isEnabled()) {
			this.setup();
		}
	}

	public abstract setup(): void;

	public abstract run(interaction: ChatInputCommandInteraction): Promise<Message>;

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		if (this.isEnabled() && this.isCorrectChannel(interaction)) {
			await this.run(interaction);
		}
	}

	protected config(): any {
		return config.get().plugins[this.name];
	}

	private isEnabled(): boolean {
		return config.get().plugins[this.name] && config.get().plugins[this.name].enable;
	}

	private isCorrectChannel(interaction: ChatInputCommandInteraction): boolean {
		return config.get().discord.channelID === interaction.channelId;
	}
}