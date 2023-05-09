import { SapphireClient } from "@sapphire/framework";
import { getRootData } from "@sapphire/pieces";
import { ClientOptions, TextChannel } from "discord.js";
import path from "path";
import { config, discordBot } from "./Main";

export class DiscordClient extends SapphireClient {
	public constructor(options: ExtendedClientOptions) {
		super(options);
		if (options.loadPlugins) {
			this.stores.get("interaction-handlers").registerPath(path.join(getRootData().root, "plugins"));
		}
	}

	public async send(message: string): Promise<void> {
		if (message.trim().length === 0) {
			return Promise.resolve();
		}
		await (discordBot.channels.cache.get(config.get().discord.channelID) as TextChannel).send(message);
	}

	public async sendEmbed(embed: any): Promise<void> {
		await (discordBot.channels.cache.get(config.get().discord.channelID) as TextChannel).send({ "embeds": [embed] });
	}
}

export interface ExtendedClientOptions extends ClientOptions {
	loadPlugins: boolean;
}