import { Bot, createBot } from "mineflayer";
import { config, minecraftBot } from "./Main";

export class MinecraftBot {
	public connected: boolean;
	public autoReconnectInterval: NodeJS.Timeout | undefined;
	public allowAutoReconnect: boolean;
	public lastLog: Log | undefined;
	public internal!: Bot;
	public startup: Function[];

	public constructor(startup: Function[]) {
		this.connected = false;
		this.lastLog = undefined;
		this.startup = startup;
		this.allowAutoReconnect = true;
	}

	public connect() {
		this.internal = createBot({ "username": config.get().credentials.email, "password": config.get().credentials.password, "auth": config.get().credentials.auth, "host": config.get().server.host, "port": config.get().server.port, "version": config.get().server.version });
		if (!this.autoReconnectInterval) { this.autoReconnectInterval = setInterval(() => { if (config.get().autoreconnect.enable && this.allowAutoReconnect && !this.connected) { this.connect(); } }, config.get().autoreconnect.interval); }
		for (const startup of this.startup) { startup(); }
	}

	public disconnect() {
		this.internal.quit();
	}

	public chat(message: string) {
		if (minecraftBot.connected && message.trim().length > 0) { this.internal.chat(message); }
	}
}

export type Log = { "type": string, "message": string }