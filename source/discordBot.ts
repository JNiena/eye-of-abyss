import {Client, Intents, TextChannel} from "discord.js";
import {Config} from "./config";

export class DiscordBot {

	public config: Config;
	private client: Client;

	constructor(config: Config) {
		this.config = config;
		this.client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
	}

	login(callback: Function = () => {}): void {
		this.client.login(this.config.get()["botToken"]).then(() => {
			callback();
		});
	}

	async message(text: string, channelID: string): Promise<any> {
		try {
			let channel = this.client.channels.cache.get(channelID);
			if (channel) {
				await (channel as TextChannel).send(text);
			}
		} catch (error) {
			console.log(error);
		}
	}

	onMessage(callback: Function): void {
		this.client.on("message", (message: any) => {
			callback(message);
		});
	}

	onReady(callback: Function): void {
		this.client.on("ready", () => {
			callback();
		});
	}

}