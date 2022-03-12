import {ChannelCommand} from "../channelCommand";
import {MinecraftBot} from "../minecraftBot";
import {Message} from "discord.js";
import {DiscordBot} from "../discordBot";

export class ConnectCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot, setupBehavior: Function) {
		super(channelID, "!connect", (message: Message) => {
			if (minecraftBot.isReconnecting()) {
				discordBot.send("**The bot is already attempting to reconnect, please wait.**", channelID).then();
				return;
			}
			if (minecraftBot.isConnected()) {
				discordBot.send("**The bot is already connected.**", channelID).then();
				return;
			}
			minecraftBot.connect();
			setupBehavior(minecraftBot);
		});
	}

}