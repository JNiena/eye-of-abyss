import {ChannelCommand} from "../channelCommand";
import {DiscordBot} from "../discordBot";
import {MinecraftBot} from "../minecraftBot";
import {Message} from "discord.js";

export class StatusCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!status", (message: Message) => {
			if (minecraftBot.isConnected()) {
				discordBot.send("**The bot is online.**", channelID).then();
			}
			else {
				discordBot.send("**The bot is offline.**", channelID).then();
			}
		});
	}

}