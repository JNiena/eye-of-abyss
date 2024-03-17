import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";
import { config } from "../Main";

export class ValidChannel extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return config.get().discord.chatChannelID === interaction.channelId
			? this.ok()
			: this.error();
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		ValidChannel: never;
	}
}

export default undefined;