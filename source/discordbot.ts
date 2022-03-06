import {Client, Intents} from "discord.js";

export class DiscordBot {

	protected token: string;
	protected client: Client;

	constructor(token: string) {
		this.token = token;
		this.client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});
	}

	login(callback: Function = () => {}) : void {
		this.client.login(this.token).then(() => {
			callback();
		});
	}

	onMessage(callback: Function) : void {
		this.client.on("message", (message) => {
			callback(message);
		});
	}

	onReady(callback: Function) : void {
		this.client.on("ready", () => {
			callback();
		})
	}

}