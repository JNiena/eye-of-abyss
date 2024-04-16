import { Files } from "../Files";
import { Filter } from "../Filter";
import { config, discordBot, minecraftBot } from "../Main";

export class ChatHandler {
	public constructor() {
		minecraftBot.internal.on("messagestr", (message: string) => {
			const formattedMessage: string = message.replace(/@/g, "");
			this.checkLogging(formattedMessage);
			this.checkFilter(formattedMessage);
		});
	}

	private checkLogging(message: string) {
		if (!Files.exists(config.get().logging.path)) { return; }
		if (config.get().logging.enable) { Files.write(config.get().logging.path, `${message}\n`); }
	}

	private checkFilter(message: string) {
		if (!config.get().filter.enable || Filter.complies(config.get().filter.list, message)) { discordBot.send(`${message}`); }
	}
}