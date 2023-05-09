import { config } from "./Main";
import { MinecraftBot } from "./MinecraftBot";

export class Repeater {
	public static start(minecraftBot: MinecraftBot): void {
		for (let i: number = 0; i < config.get().repeater.length; i++) {
			setInterval(() => {
				if (minecraftBot && minecraftBot.isConnected()) {
					minecraftBot.chat(config.get().repeater[i].message);
				}
			}, config.get().repeater[i].interval);
		}
	}
}