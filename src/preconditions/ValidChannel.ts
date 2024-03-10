import { Precondition } from "@sapphire/framework";
import { Message } from "discord.js";
import { config } from "../Main";

export class ValidChannel extends Precondition {
	public async messageRun(message: Message<boolean>) {
		return config.get().discord.chatChannelID === message.channelId
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