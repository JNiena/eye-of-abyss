import {ChannelCommand} from "../ChannelCommand";
import {MinecraftBot} from "../MinecraftBot";
import {Message} from "discord.js";
import {DiscordBot} from "../DiscordBot";

export class DisableCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!disable", (message: Message) => {
			minecraftBot.config.get()["whitelist"]["enabled"] = false;
			minecraftBot.config.save();
			discordBot.send("**Whitelist disabled.**", channelID).then();
		});
	}

}