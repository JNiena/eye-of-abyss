import { Bot, createBot } from "mineflayer";
import { config } from "./Main";

export class MinecraftBot {
	public connected: boolean;
	public lastLog: Log | undefined;
	public internal!: Bot;
	public startup: Function;
	public static username: string | undefined;

	public constructor(startup: Function) {
		this.connected = false;
		this.lastLog = undefined;
		this.startup = startup;
	}

	public connect() {
		this.internal = createBot({ "username": config.get().credentials.email, "password": config.get().credentials.password, "auth": config.get().credentials.auth, "host": config.get().server.host, "port": config.get().server.port, "version": config.get().server.version });
		setInterval(() => { if (config.get().events.disconnect.reconnect) { if (!this.connected) { this.connect(); } } }, config.get().events.disconnect.delay);
		this.startup();
	}

	public disconnect() {
		this.internal.quit();
	}

	public reconnect() {
		if (this.connected) { this.disconnect(); }
		this.connect();
	}

	public chat(message: string) {
		if (message.trim().length > 0) { this.internal.chat(message); }
	}
}

export type Log = { "type": string, "message": string }