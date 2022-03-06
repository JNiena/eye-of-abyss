import {Bot, createBot} from "mineflayer";

export class MinecraftBot {

	protected email: string;
	protected password: string;
	protected host: string;
	protected port: number;
	protected bot: Bot;

	constructor(email: string, password: string, host: string, port: number = 25565) {
		this.email = email;
		this.password = password;
		this.host = host;
		this.port = port;
		this.bot = createBot({
			username: email,
			password: password,
			host: host,
			port: port
		});
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

	onMessage(callback: Function = () => {}): void {
		this.bot.on("message", () => {
			callback();
		});
	}

	onKicked(callback: Function = () => {}): void {
		this.bot.on("kicked", () => {
			callback();
		});
	}

}