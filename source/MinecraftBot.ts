import {Config} from "./Config";
import {BotEvents, createBot} from "mineflayer";

export class MinecraftBot {

	public config: Config;
	private initialize: Function;
	private bot: any;
	private connected: boolean;

	public constructor(config: Config, initialize: Function = () => {}) {
		this.config = config;
		this.initialize = initialize;
		this.connected = false;
	}

	public connect(delay: number = 0): void {
		setTimeout(() => {
			if (this.isConnected()) return;
			this.bot = createBot({
				"username": this.config.get()["credentials"]["email"],
				"password": this.config.get()["credentials"]["password"],
				"auth": this.config.get()["credentials"]["auth"],
				"host": this.config.get()["server"]["host"],
				"port": this.config.get()["server"]["port"],
				"version": this.config.get()["server"]["version"]
			});
			this.bot.on("login", () => { this.connected = true; });
			this.bot.on("end", () => { this.connected = false; });
			this.initialize();
		}, delay);
	}

	public disconnect(delay: number = 0): void {
		setTimeout(() => {
			this.bot.quit();
		}, delay);
	}

	public reconnect(delay: number = 0): void {
		setTimeout(() => {
			if (this.isConnected()) this.bot.disconnect();
			this.bot.connect();
		}, delay);
	}

	public isConnected(): boolean {
		return this.connected;
	}

	public on(event: keyof BotEvents, listener: Function): void {
		this.bot.on(event, listener);
	}

	public once(event: keyof BotEvents, listener: Function): void {
		this.bot.once(event, listener);
	}

	public chat(message: string, delay: number = 0): void {
		setTimeout(() => {
			if (message.length !== 0) this.bot.chat(message);
		}, delay);
	}

}