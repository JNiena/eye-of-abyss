import {ChannelCommand} from "../channelCommand";
import {DiscordBot} from "../discordBot";
import {MinecraftBot} from "../minecraftBot";
import {Message} from "discord.js";

export class ResetCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!reset", (message: Message) => {
			minecraftBot.config.get()["whitelist"]["filter"] = [];
			minecraftBot.config.save();
			discordBot.send("**The whitelist has been reset.**", channelID).then();
		});
	}

}