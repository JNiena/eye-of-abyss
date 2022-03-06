import {Bot, createBot} from "mineflayer";
import {Config} from "./config";

export class MinecraftBot {

	public config: Config;
	private bot: Bot;

	constructor(config: Config) {
		this.config = config;
		this.bot = createBot({
			username: config.get()["email"],
			password: config.get()["password"],
			host: config.get()["host"],
			port: config.get()["port"]
		});
	}

	chat(message: string): void {
		this.bot.chat(message);
	}

	onSpawn(callback: Function = () => {}): void {
		this.bot.on("spawn", () => {
			callback();
		});
	}

	onFirstSpawn(callback: Function = () => {}): void {
		this.bot.once("spawn", () => {
			callback();
		});
	}

	onChat(callback: Function = () => {}): void {
		this.bot.on("chat", (username, message) => {
			callback(username, message);
		});
	}

	onKicked(callback: Function = () => {}): void {
		this.bot.on("kicked", () => {
			callback();
		});
	}

}