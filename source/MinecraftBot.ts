import { Bot, BotEvents, createBot } from "mineflayer";
import { config } from "./Main";

export class MinecraftBot {
	public connected: boolean;
	// @ts-ignore
	private bot: Bot;
	private startup: Function[];

	public constructor() {
		this.connected = false;
		this.startup = [];
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
			this.initializeStartup();
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

	public on(event: keyof BotEvents, listener: Function): void {
		this.startup.push(() => {
			// @ts-ignore
			this.bot.on(event, listener);
		});
	}

	public once(event: keyof BotEvents, listener: Function): void {
		this.startup.push(() => {
			// @ts-ignore
			this.bot.once(event, listener);
		});
	}

	public chat(message: string, delay: number = 0): void {
		setTimeout(() => {
			if (message.length > 0) {
				this.bot.chat(message);
			}
		}, delay);
	}

	public isConnected(): boolean {
		return this.connected;
	}

	public internal(): Bot {
		return this.bot;
	}

	private initializeStartup(): void {
		for (let i: number = 0; i < this.startup.length; i++) {
			this.startup[i]();
		}
	}
}