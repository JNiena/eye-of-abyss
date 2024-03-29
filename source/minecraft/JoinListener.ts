import { config, minecraftBot } from "../Main";

export class JoinListener {
	public constructor() {
		minecraftBot.on("spawn", () => {
			if (config.get().events.join.enable) {
				minecraftBot.chat(config.get().events.join.message, config.get().events.join.delay);
			}
		});
	}
}