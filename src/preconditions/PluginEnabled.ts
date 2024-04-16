import { Precondition } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { config } from "../Main";

export class PluginEnabled extends Precondition {
	public async chatInputRun(interaction: ChatInputCommandInteraction) {
		return this.isEnabled(interaction.commandName);
	}

	private async isEnabled(commandName: string) {
		return config.get().plugins.includes(commandName)
			? this.ok()
			: this.error();
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		PluginEnabled: never;
	}
}