import { BotEvents } from "mineflayer";
import { BaseBot } from "./BaseBot";

export class ListeningBot extends BaseBot {
	public constructor(registerListeners: Function) {
		super();
		this.startup.push(registerListeners);
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
}