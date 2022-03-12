import {ChannelCommand} from "../channelCommand";
import {MinecraftBot} from "../minecraftBot";
import {Message} from "discord.js";
import {DiscordBot} from "../discordBot";

export class DisableCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!disable", (message: Message) => {
			minecraftBot.config.get()["whitelist"]["enabled"] = false;
			minecraftBot.config.save();
			discordBot.send("**Whitelist disabled.**", channelID).then();
		});
	}

}