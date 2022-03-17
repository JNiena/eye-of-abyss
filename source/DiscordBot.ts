import {Intents, TextChannel} from "discord.js";
import {AkairoClient, CommandHandler} from "discord-akairo";
import {Config} from "./Config";

export class DiscordBot extends AkairoClient {

	private commandHandler: CommandHandler;

	constructor(config: Config) {
		super({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
		this.commandHandler = new CommandHandler(this, {
			"directory": config.get()["commands"]["path"],
			"prefix": config.get()["commands"]["prefix"]
		});
		this.commandHandler.loadAll();
	}

	async send(text: string, channelID: string): Promise<any> {
		if (text.length === 0) return Promise.resolve();
		try {
			let channel = this.channels.cache.get(channelID);
			if (channel) await (channel as TextChannel).send(text);
		} catch (error) {
			console.log(error);
		}
	}

}