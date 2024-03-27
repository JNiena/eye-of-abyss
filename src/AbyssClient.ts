import { SapphireClient } from "@sapphire/framework";
import { getRootData } from "@sapphire/pieces";
import { APIEmbed, ClientOptions, TextChannel } from "discord.js";
import path from "path";
import { config } from "./Main";

export class AbyssClient extends SapphireClient {
	public constructor(options: ExtendedClientOptions) {
		super(options);
		if (options.loadPlugins) { this.stores.registerPath(path.join(getRootData().root, "plugins")); }
	}

	public async send(message: string, channelID: string = config.get().discord.chatChannelID) {
		if (message.trim().length === 0) { return Promise.reject(); }
		return await (this.channels.cache.get(channelID) as TextChannel).send(message);
	}

	public async sendEmbed(embed: APIEmbed, channelID: string = config.get().discord.chatChannelID) {
		return await (this.channels.cache.get(channelID) as TextChannel).send({ "embeds": [embed] });
	}
}

export interface ExtendedClientOptions extends ClientOptions {
	loadPlugins: boolean;
}