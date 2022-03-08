import {Bot, createBot} from "mineflayer";
import {Config} from "./config";

export class MinecraftBot {

	public config: Config;
	private bot: Bot;

	constructor(config: Config) {
		this.config = config;
		this.bot = createBot({
			username: config.get()["bot"]["email"],
			password: config.get()["bot"]["password"],
			host: config.get()["bot"]["host"],
			port: config.get()["bot"]["port"]
		});
	}

	chat(message: string): void {
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
		this.bot.on("kicked", () => {
			callback();
		});
	}

}