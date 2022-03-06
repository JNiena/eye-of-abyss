import {Client, Intents} from "discord.js";

export class DiscordBot {

	protected token: string;
	protected client: Client;

	constructor(token: string) {
		this.token = token;
		this.client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});
	}

	onMessage(handler: Function) {

	}

}