import {ChannelCommand} from "../ChannelCommand";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";
import {DiscordBot} from "../DiscordBot";

export class EnableCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!enable", (message: Message) => {
			minecraftBot.config.get()["whitelist"]["enabled"] = true;
			minecraftBot.config.save();
			discordBot.send("**Whitelist enabled.**", channelID).then();
		});
	}

}