import {Config} from "./Config";
import {AkairoClient, Command, CommandHandler} from "discord-akairo";
import {TextChannel} from "discord.js";

export class DiscordBot extends AkairoClient {

	private commandHandler: CommandHandler;

	public constructor(config: Config) {
		super();
		this.commandHandler = new CommandHandler(this, {"prefix": config.get()["discord"]["prefix"]});
		this.token = config.get()["discord"]["token"];
	}

	public start(): void {
		if (this.token !== null && this.token !== undefined) {
			this.login(this.token).then();
		}
	}

	public stop(): void {
		this.destroy();
	}

	public register(command: Command): void {
		this.commandHandler.register(command);
	}

	public async send(message: string, channelID: string): Promise<any> {
		if (message.length === 0) return Promise.resolve();
		await (this.channels.cache.get(channelID) as TextChannel).send(message);
	}

}