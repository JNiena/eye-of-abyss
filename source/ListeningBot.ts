import { BotEvents } from "mineflayer";
import { BaseBot } from "./BaseBot";

export class ListeningBot extends BaseBot {
	public constructor() {
		super();
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