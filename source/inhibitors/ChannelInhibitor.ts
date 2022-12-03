import { Command, Inhibitor } from "discord-akairo";
import { Message } from "discord.js";
import { Config } from "../Config";

export class ChannelInhibitor extends Inhibitor {

	private ID: string;

	public constructor(config: Config) {
		super("channel", {
			"reason": ""
		});
		this.ID = config.get()["discord"]["channelID"];
	}

	public exec(message: Message, command: Command): boolean | Promise<boolean> {
		return this.ID !== message.channel.id;
	}

}