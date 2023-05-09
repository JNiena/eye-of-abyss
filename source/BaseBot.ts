import { Bot, createBot } from "mineflayer";
import { config } from "./Main";

export class BaseBot {
	// @ts-ignore
	protected bot: Bot;
	private connected: boolean;
	protected startup: Function[];

	public constructor() {
		this.connected = false;
		this.startup = [];
	}

	public connect(delay: number = 0): void {
		setTimeout(() => {
			if (!this.connected) {
				this.bot = createBot({
					"username": config.get().credentials.email,
					"password": config.get().credentials.password,
					"auth": config.get().credentials.auth,
					"host": config.get().server.host,
					"port": config.get().server.port,
					"version": config.get().server.version
				});
				this.bot.on("login", () => { this.connected = true; });
				this.bot.on("end", () => { this.connected = false; });
				this.initializeStartup();
			}
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
			this.connect();
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