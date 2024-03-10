import { Args } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, discordBot } from "../Main";
import { Message } from "discord.js";

export class AdvertiseCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "advertise",
			"aliases": ["ad", "advertisement"],
			"description": "Modifies the advertisements.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "add", "messageRun": "messageAdd", },
				{ "name": "remove", "messageRun": "messageRemove" },
				{ "name": "enable", "messageRun": "messageEnable" },
				{ "name": "disable", "messageRun": "messageDisable" },
				{ "name": "reset", "messageRun": "messageReset" },
				{ "name": "list", "messageRun": "messageList" },
				{ "name": "info", "messageRun": "messageInfo" },
				{ "name": "edit", "messageRun": "messageEdit" }
			]
		});
	}

	public async messageList(_message: Message<boolean>) {
		if (config.get().advertisements.length === 0) { return discordBot.sendEmbed(Embeds.adsEmpty()); }
		return discordBot.sendEmbed(Embeds.adList(config.get().advertisements));
	}

	public async messageInfo(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return discordBot.sendEmbed(Embeds.adNotFound()); }
		return discordBot.sendEmbed(Embeds.adInfo(ad));
	}

	public async messageEnable(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		config.get().advertisements.find((ad: Advertisement) => ad.name === name).enable = true;
		config.save();
		return discordBot.sendEmbed(Embeds.adEnabled());
	}

	public async messageDisable(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		config.get().advertisements.find((ad: Advertisement) => ad.name === name).enable = false;
		config.save();
		return discordBot.sendEmbed(Embeds.adDisabled());
	}

	public async messageReset(_message: Message<boolean>) {
		config.get().advertisements = [];
		config.save();
		return discordBot.sendEmbed(Embeds.adsReset());
	}

	public async messageAdd(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		const interval: number = await args.pick("number");
		const randomizer: number = await args.pick("number").catch(() => 0);
		const text: string = await args.rest("string");
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (ad) { return discordBot.sendEmbed(Embeds.adAlreadyAdded(name)); }
		config.get().advertisements.push({ "enable": true, "name": name, "text": text, "interval": interval * 60_000, "randomizer": randomizer * 60_000 });
		config.save();
		return discordBot.sendEmbed(Embeds.adAdded(name));
	}

	public async messageRemove(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return discordBot.sendEmbed(Embeds.adAlreadyRemoved(name)); }
		config.get().advertisements = config.get().advertisements.filter((ad: Advertisement) => ad.name !== name);
		return discordBot.sendEmbed(Embeds.adRemoved(name));
	}

	public async messageEdit(_message: Message<boolean>, args: Args) {
		const name: string = (await args.pick("string")).toLowerCase();
		const key: string = (await args.pick("string")).toLowerCase();
		const value: string = await args.pick("string");
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return discordBot.sendEmbed(Embeds.adNotFound()); }
		if (key === "name") { ad.name = value; }
		else if (key === "title") { ad.text = value; }
		else if (key === "interval") { ad.interval = +value * 60_000; }
		else if (key === "randomizer") { ad.randomizer = +value * 60_000; }
		config.save();
		return discordBot.sendEmbed(Embeds.adEdited(name));
	}
}

export type Advertisement = { "enable": boolean, "name": string, "text": string, "interval": number, "randomizer": number }