import { Subcommand } from "@sapphire/plugin-subcommands";
import { ChatInputCommandInteraction } from "discord.js";
import { config } from "./Main";

export abstract class PluginSubcommand extends Subcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, options);
		if (this.isEnabled()) {
			this.setup();
		}
	}

	public abstract setup(): void;

	protected config(): any {
		return config.get().plugins[this.name];
	}

	protected isEnabled(): boolean {
		return config.get().plugins[this.name] && config.get().plugins[this.name].enable;
	}

	protected isCorrectChannel(interaction: ChatInputCommandInteraction): boolean {
		return config.get().discord.channelID === interaction.channelId;
	}
}