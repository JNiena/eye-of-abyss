import {Command} from "../Command";
import {Message} from "discord.js";
import {MinecraftBot} from "../MinecraftBot";

export class SayCommand extends Command {

	constructor(channelID: string, minecraftBot: MinecraftBot) {
		super(channelID, "!say", (message: Message) => {
			minecraftBot.chat(message.toString());
		});
	}

}