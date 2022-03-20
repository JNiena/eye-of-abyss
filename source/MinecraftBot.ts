import {createBot} from "mineflayer";
import {Config} from "./Config";
import {EventListener} from "./EventListener";

export class MinecraftBot {

	public config: Config;
	private reconnecting: boolean;
	private connected: boolean;
	private initializeFunction: Function;
	private bot: any;

	public constructor(config: Config, initializeFunction: Function = () => {}) {
		this.config = config;
		this.reconnecting = false;
		this.connected = false;
		this.initializeFunction = initializeFunction;
		if (config.get()["enabled"]) this.connect();
	}

	public connect(): void {
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
		this.initializeFunction(this);
	}

	public reconnect(handler: Function = () => {}): void {
		this.reconnecting = true;
		setTimeout(() => {
			this.connect();
			handler();
			this.reconnecting = false;
		}, this.config.get()["autoRejoin"]["delay"]);
	}

	public disconnect(): void {
		this.bot.quit();
	}

	public chat(message: string): void {
		if (message.length === 0) return;
		this.bot.chat(message);
	}

	public on(event: string, listener: EventListener) {
		this.bot.on(event, listener.handle);
	}

	public once(event: string, listener: EventListener) {
		this.bot.once(event, listener.handle);
	}

	public isConnected(): boolean {
		return this.connected;
	}

	public isReconnecting(): boolean {
		return this.reconnecting;
	}

}