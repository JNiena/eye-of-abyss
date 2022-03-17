import {Intents, TextChannel} from "discord.js";
import {AkairoClient, Command, CommandHandler} from "discord-akairo";
import {Config} from "./Config";

export class DiscordBot extends AkairoClient {

	private commandHandler: CommandHandler;

	public constructor(config: Config) {
		super({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
		this.commandHandler = new CommandHandler(this, {
			"directory": config.get()["commands"]["path"],
			"prefix": config.get()["commands"]["prefix"]
		});
		this.commandHandler.loadAll();
		this.token = config.get()["token"];
	}

	public connect(callback: Function = () => {}): void {
		if (this.token) {
			this.login(this.token).then(() => {
				callback();
			});
		}
	}

	public registerCommand(command: Command): void {
		this.commandHandler.register(command);
	}

	public async send(text: string, channelID: string): Promise<any> {
		if (text.length === 0) return Promise.resolve();
		try {
			let channel = this.channels.cache.get(channelID);
			if (channel) await (channel as TextChannel).send(text);
		} catch (error) {
			console.log(error);
		}
	}

}