import { Bot, BotEvents, createBot } from "mineflayer";
import { config } from "./Main";

export class MinecraftBot {
	// @ts-ignore
	private bot: Bot;
	private startup: Function;
	public connected: boolean;

	public constructor(startup: Function) {
		this.connected = false;
		this.startup = startup;
	}

	public connect(delay: number = 0): void {
		setTimeout(() => {
			this.bot = createBot({
				"username": config.get().credentials.email,
				"password": config.get().credentials.password,
				"auth": config.get().credentials.auth,
				"host": config.get().server.host,
				"port": config.get().server.port,
				"version": config.get().server.version
			});
			this.startup();
		}, delay);
	}

	public disconnect(delay: number = 0): void {
		setTimeout(() => {
			this.bot.quit();
		}, delay);
	}

	public reconnect(delay: number = 0): void {
		setTimeout(() => {
			if (this.isConnected()) {
				this.disconnect();
			}
			this.connect(delay);
		}, delay);
	}

	public isConnected(): boolean {
		return this.connected;
	}

	public on(event: keyof BotEvents, listener: Function): void {
		// @ts-ignore
		this.bot.on(event, listener);
	}

	public once(event: keyof BotEvents, listener: Function): void {
		// @ts-ignore
		this.bot.once(event, listener);
	}

	public chat(message: string, delay: number = 0): void {
		setTimeout(() => {
			if (message.length > 0) {
				this.bot.chat(message);
			}
		}, delay);
	}

	public internal(): Bot {
		return this.bot;
	}
}