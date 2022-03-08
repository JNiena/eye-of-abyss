import {Client, Intents, TextChannel} from "discord.js";
import {Config} from "./config";
import {Command} from "./command";

export class DiscordBot {

	public config: Config;
	private client: Client;
	private commands: Command[];

	constructor(config: Config) {
		this.config = config;
		this.client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
		this.commands = [];
	}

	startListening() {
		this.client.on("messageCreate", (message: any) => {
			if (message.author.bot) return;
			if (message.channel.type !== "text") return;
			for (let i = 0; i < this.commands.length; i++) {
				let messagePrefix: string = message.content.split(" ")[0];
				let commandPrefix: string = this.commands[i].name;
				if (messagePrefix === commandPrefix) {
					message.content = message.content.replace(messagePrefix, "");
					this.commands[i].handle(message);
					break;
				}
			}
		});
	}

	registerCommand(command: Command) {
		this.commands.push(command);
	}

	login(callback: Function = () => {}): void {
		this.client.login(this.config.get()["botToken"]).then(() => {
			callback();
		});
	}

	async sendMessage(text: string, channelID: string): Promise<any> {
		try {
			let channel = this.client.channels.cache.get(channelID);
			if (channel) await (channel as TextChannel).send(text);
		} catch (error) {
			console.log(error);
		}
	}

}