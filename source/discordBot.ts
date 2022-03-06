import {Client, Intents} from "discord.js";
import {Config} from "./config";

export class DiscordBot {

	public config: Config;
	private client: Client;

	constructor(config: Config) {
		this.config = config;
		this.client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});
	}

	login(callback: Function = () => {}): void {
		this.client.login(this.config.get()["botToken"]).then(() => {
			callback();
		});
	}

	onMessage(callback: Function): void {
		this.client.on("message", (message) => {
			callback(message);
		});
	}

	onReady(callback: Function): void {
		this.client.on("ready", () => {
			callback();
		});
	}

}