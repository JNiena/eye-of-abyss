import {MinecraftBot} from "../MinecraftBot";
import {DiscordBot} from "../DiscordBot";
import {Config} from "../Config";
import {Filter} from "../Filter";
import {Files} from "../Files";

export class ChatListener {

	public constructor(minecraftBot: MinecraftBot, discordBot: DiscordBot) {
		let config: Config = minecraftBot.config;
		let channelID: string = config.get()["discord"]["channelID"];

		minecraftBot.on("chat", (username: string, message: string) => {
			let filter: Filter | undefined;
			if (config.get()["filter"]["enable"]) filter = new Filter(config.get()["filter"]["list"]);

			let formattedMessage: string = `${username} » ${message}`;
			if (config.get()["logging"]["enable"]) Files.write(config.get()["logging"]["path"], `${formattedMessage}\n`);
			if (filter === undefined || filter.complies(`${username} ${message}`)) discordBot.send(formattedMessage, channelID).then();

			for (let i = 0; i < config.get()["chat"].length; i++) {
				if (message.toLowerCase().includes(config.get()["chat"][i]["trigger"].toLowerCase())) {
					minecraftBot.chat(config.get()["chat"][i]["reply"], config.get()["chat"][i]["delay"]);
				}
			}
		});
	}

}