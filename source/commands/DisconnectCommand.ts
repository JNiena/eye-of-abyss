import {Command} from "../Command";
import {MinecraftBot} from "../MinecraftBot";
import {DiscordBot} from "../DiscordBot";
import {Message} from "discord.js";

export class DisconnectCommand extends Command {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!disconnect", (message: Message) => {
			if (!minecraftBot.isConnected()) {
				discordBot.send("**The bot is already disconnected.**", channelID).then();
				return;
			}
			minecraftBot.disconnect();
			discordBot.send("**Successfully disconnected.**", channelID).then();
		});
	}

}