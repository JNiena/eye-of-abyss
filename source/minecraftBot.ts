import {createBot} from "mineflayer";
import {Config} from "./config";

export class MinecraftBot {

	public config: Config;
	private bot: any;

	constructor(config: Config) {
		this.config = config;
		this.connect();
	}

	connect(): void {
		this.bot = createBot({
			username: this.config.get()["bot"]["email"],
			password: this.config.get()["bot"]["password"],
			host: this.config.get()["bot"]["host"],
			port: this.config.get()["bot"]["port"],
			auth: this.config.get()["bot"]["auth"]
		});
	}

	isConnected(): boolean {
		return false;
	}

	disconnect(): void {
		this.bot.quit();
	}

	chat(message: string): void {
		if (message.length === 0) return;
		this.bot.chat(message);
	}

	onSpawn(callback: Function): void {
		this.bot.on("spawn", () => {
			callback();
		});
	}

	onFirstSpawn(callback: Function): void {
		this.bot.once("spawn", () => {
			callback();
		});
	}

	onChat(callback: Function): void {
		this.bot.on("chat", (username: string, message: string) => {
			callback(username, message);
		});
	}

	onKicked(callback: Function): void {
		this.bot.on("kicked", (reason: string) => {
			callback(reason);
		});
	}

	onError(callback: Function): void {
		this.bot.on("error", (error: Error) => {
			callback(error);
		});
	}

}