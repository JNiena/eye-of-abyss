import { ControlState } from "mineflayer";
import { config, minecraftBot } from "../Main";

export class SpawnHandler {
	public constructor() {
		minecraftBot.internal.on("spawn", () => {
			if (config.get().events.connect.enable) {
				for (let message of config.get().events.connect.messages) { setTimeout(() => { minecraftBot.chat(message.text); }, message.delay); }
				for (let action of config.get().events.connect.actions) {
					setTimeout(() => {
						minecraftBot.internal.setControlState(action.type as ControlState, true);
						setTimeout(() => { minecraftBot.internal.setControlState(action.type as ControlState, false); }, 1000);
					}, action.delay);
				}
			}
		});
	}
}