import {Command} from "../Command";
import {DiscordBot} from "../DiscordBot";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";

export class AddCommand extends Command {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!add", (message: Message) => {
			if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
				discordBot.send("**That word is already on the whitelist.**", channelID).then();
				return;
			}
			minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
			minecraftBot.config.save();
			discordBot.send("**Added \"" + message.content + "\" to the whitelist.**", channelID).then();
		});
	}

}