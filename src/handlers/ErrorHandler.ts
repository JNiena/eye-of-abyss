import { minecraftBot } from "../Main";

export class ErrorHandler {
	public constructor() {
		minecraftBot.internal.on("error", (error: Error) => {
			minecraftBot.lastLog = { "type": "Error", "message": error.message };
			if (!error.message.includes("client timed out")) { minecraftBot.allowAutoReconnect = false; }
		});
	}
}