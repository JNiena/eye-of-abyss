import { Precondition } from "@sapphire/framework";
import { Message } from "discord.js";
import { config } from "../Main";

export class PluginEnabled extends Precondition {
	public async messageRun(message: Message<boolean>) {
		const name: string = message.content.includes(" ")
			? message.content.substring(1, message.content.indexOf(" "))
			: message.content.substring(1);
		return config.get().plugins.includes(name)
			? this.ok()
			: this.error();
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		PluginEnabled: never;
	}
}

export default undefined;