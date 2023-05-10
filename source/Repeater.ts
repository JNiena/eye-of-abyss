import { config, minecraftBot } from "./Main";

export class Repeater {
	public static start(): void {
		for (let i: number = 0; i < config.get().repeater.length; i++) {
			setInterval(() => {
				if (minecraftBot && minecraftBot.isConnected()) {
					minecraftBot.chat(config.get().repeater[i].message);
				}
			}, config.get().repeater[i].interval);
		}
	}
}