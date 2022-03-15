import {createBot} from "mineflayer";
import {Config} from "./Config";
import {EventListener} from "./EventListener";

export class MinecraftBot {

	public config: Config;
	private reconnecting: boolean;
	private connected: boolean;
	private bot: any;

	constructor(config: Config) {
		this.config = config;
		this.reconnecting = false;
		this.connected = false;
	}

	connect(): void {
		this.bot = createBot({
			username: this.config.get()["bot"]["email"],
			password: this.config.get()["bot"]["password"],
			host: this.config.get()["bot"]["host"],
			port: this.config.get()["bot"]["port"],
			version: this.config.get()["bot"]["version"],
			auth: this.config.get()["bot"]["auth"]
		});
		this.bot.on("login", () => {
			this.connected = true;
		});
		this.bot.on("end", () => {
			this.connected = false;
		});
	}

	reconnect(handler: Function): void {
		this.reconnecting = true;
		setTimeout(() => {
			this.connect();
			handler();
			this.reconnecting = false;
		}, this.config.get()["autoRejoin"]["delay"]);
	}

	disconnect(): void {
		this.bot.quit();
	}

	chat(message: string): void {
		if (message.length === 0) return;
		this.bot.chat(message);
	}

	on(event: string, listener: EventListener) {
		this.bot.on(event, listener.handle);
	}

	once(event: string, listener: EventListener) {
		this.bot.once(event, listener.handle);
	}

	isConnected(): boolean {
		return this.connected;
	}

	isReconnecting(): boolean {
		return this.reconnecting;
	}

}