import {ChannelCommand} from "../ChannelCommand";
import {Message} from "discord.js";
import {DiscordBot} from "../DiscordBot";
import {MinecraftBot} from "../MinecraftBot";

export class ListCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!list", (message: Message) => {
			discordBot.send("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", channelID).then();
		});
	}

}