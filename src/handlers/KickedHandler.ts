import { minecraftBot } from "../Main";

export class KickedHandler {
	public constructor() {
		minecraftBot.internal.on("kicked", (reason: string) => {
			minecraftBot.lastLog = { "type": "Kicked", "message": reason };
			if (reason.includes("already connected to this proxy") || reason.includes("duplicate_login")) { minecraftBot.allowAutoReconnect = false; }
		});
	}
}