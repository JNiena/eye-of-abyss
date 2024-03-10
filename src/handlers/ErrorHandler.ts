import { minecraftBot } from "../Main";

export class ErrorHandler {
	public constructor() {
		minecraftBot.internal.on("error", (error: Error) => { minecraftBot.lastLog = { "type": "Error", "message": error.message }; });
	}
}