import { Args } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, discordBot } from "../Main";
import { Message } from "discord.js";

export class FilterCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "filter",
			"description": "Modifies the filter.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "list", "messageRun": "messageList", },
				{ "name": "enable", "messageRun": "messageEnable" },
				{ "name": "disable", "messageRun": "messageDisable" },
				{ "name": "reset", "messageRun": "messageReset" },
				{ "name": "add", "messageRun": "messageAdd" },
				{ "name": "remove", "messageRun": "messageRemove" },
				{ "name": "paste", "messageRun": "messagePaste" }
			]
		});
	}

	public async messageList(_message: Message<boolean>) {
		if (config.get().filter.list.length === 0) { return discordBot.sendEmbed(Embeds.filterEmpty()); }
		return discordBot.sendEmbed(Embeds.filterList(config.get().filter.list));
	}

	public async messageEnable(_message: Message<boolean>) {
		config.get().filter.enable = true;
		config.save();
		return discordBot.sendEmbed(Embeds.filterEnabled());
	}

	public async messageDisable(_message: Message<boolean>) {
		config.get().filter.enable = false;
		config.save();
		return discordBot.sendEmbed(Embeds.filterDisabled());
	}

	public async messageReset(_message: Message<boolean>) {
		config.get().filter.list = [];
		config.save();
		return discordBot.sendEmbed(Embeds.filterReset());
	}

	public async messageAdd(_message: Message<boolean>, args: Args) {
		const item: string = (await args.rest("string")).toLowerCase();
		if (config.get().filter.list.includes(item)) { return discordBot.sendEmbed(Embeds.filterAlreadyAdded(item)); }
		config.get().filter.list.push(item);
		config.save();
		return discordBot.sendEmbed(Embeds.filterAdded(item));
	}

	public async messageRemove(_message: Message<boolean>, args: Args) {
		const item: string = (await args.rest("string")).toLowerCase();
		if (config.get().filter.list.includes(item)) {
			config.get().filter.list = config.get().filter.list.filter((element: string) => element !== item);
			config.save();
			return discordBot.sendEmbed(Embeds.filterRemoved(item));
		}
		return discordBot.sendEmbed(Embeds.filterAlreadyRemoved(item));
	}

	public async messagePaste(_message: Message<boolean>, args: Args) {
		const list: string = (await (args.rest("string"))).toLowerCase();
		config.get().filter.list = list.split(", ");
		config.save();
		return discordBot.sendEmbed(Embeds.filterPasted());
	}
}