import {Message} from "discord.js";
import {ChannelCommand} from "../ChannelCommand";
import {DiscordBot} from "../DiscordBot";
import {MinecraftBot} from "../MinecraftBot";

export class RemoveCommand extends ChannelCommand {

	constructor(channelID: string, discordBot: DiscordBot, minecraftBot: MinecraftBot) {
		super(channelID, "!remove", (message: Message) => {
			if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
				discordBot.send("**That word isn't on the whitelist.**", channelID).then();
				return;
			}
			minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element: any) => element !== message.content.toLowerCase());
			minecraftBot.config.save();
			discordBot.send("**Removed \"" + message.content + "\" from the whitelist.**", channelID).then();
		});
	}

}