import { Files } from "../Files";
import { Filter } from "../Filter";
import { config, discordBot, minecraftBot } from "../Main";

export class ChatListener {
	public constructor() {
		minecraftBot.on("messagestr", (message: string) => {
			const formattedMessage: string = message.replace(/@/g, "");
			this.checkLogging(formattedMessage);
			this.checkFilter(formattedMessage);
			this.checkChatTriggers(formattedMessage);
		});
	}

	private checkLogging(message: string): void {
		if (config.get().logging.enable) {
			Files.write(config.get().logging.path, `${message}\n`);
		}
	}

	private checkFilter(message: string): void {
		if (!config.get().filter.enable || Filter.complies(config.get().filter.list, message)) {
			if (message.length > 1) {
				discordBot.send(`${message}`).then();
			}
		}
	}

	private checkChatTriggers(message: string): void {
		for (let i = 0; i < config.get().chat.length; i++) {
			if (message.toLowerCase().includes(config.get().chat[i].trigger.toLowerCase())) {
				minecraftBot.chat(config.get().chat[i].reply, config.get().chat[i].delay);
			}
		}
	}
}