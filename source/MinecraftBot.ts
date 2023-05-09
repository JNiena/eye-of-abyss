import { ListeningBot } from "./ListeningBot";

export class MinecraftBot extends ListeningBot {
	public chat(message: string, delay: number = 0): void {
		setTimeout(() => {
			if (message.length !== 0) {
				this.bot.chat(message);
			}
		}, delay);
	}
}