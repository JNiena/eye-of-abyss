import {ChannelCommand} from "../channelCommand";
import {Message} from "discord.js";
import {MinecraftBot} from "../minecraftBot";

export class SayCommand extends ChannelCommand {

	constructor(channelID: string, minecraftBot: MinecraftBot) {
		super(channelID, "!say", (message: Message) => {
			minecraftBot.chat(message.toString());
		});
	}

}