import { minecraftBot } from "../Main";

export class KickedHandler {
	public constructor() {
		minecraftBot.internal.on("kicked", (reason: string) => { minecraftBot.lastLog = { "type": "Kicked", "message": reason }; });
	}
}