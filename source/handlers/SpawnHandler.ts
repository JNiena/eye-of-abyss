import { config, minecraftBot } from "../Main";

export class SpawnHandler {
	public constructor() {
		minecraftBot.internal.on("spawn", () => { if (config.get().events.connect.enable) { setTimeout(() => { minecraftBot.chat(config.get().events.connect.message); }, config.get().events.connect.delay); } });
	}
}