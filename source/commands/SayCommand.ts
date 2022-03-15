import {ChannelCommand} from "../ChannelCommand";
import {Message} from "discord.js";
import {MinecraftBot} from "../MinecraftBot";

export class SayCommand extends ChannelCommand {

	constructor(channelID: string, minecraftBot: MinecraftBot) {
		super(channelID, "!say", (message: Message) => {
			minecraftBot.chat(message.toString());
		});
	}

}