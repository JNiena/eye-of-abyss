import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";

export class DropCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "drop",
			"description": "Drops items from the bot's inventory, armor, mainhand, or offhand.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		if (!minecraftBot.connected) { return discordBot.sendEmbed(Embeds.offline()); }
		const section: string = await args.pick("string");
		switch (section) {
			case "inventory":
				this.dropInventory();
				return discordBot.sendEmbed(Embeds.inventoryDropped());
			case "armor":
				this.dropArmor();
				return discordBot.sendEmbed(Embeds.armorDropped());
			case "offhand":
				this.dropOffhand();
				return discordBot.sendEmbed(Embeds.offhandDropped());
			case "mainhand":
				this.dropMainhand();
				return discordBot.sendEmbed(Embeds.mainhandDropped());
		}
		return discordBot.sendEmbed(Embeds.invalidOption());
	}

	private dropInventory(): void {
		this.drop([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]);
	}

	private dropArmor(): void {
		this.drop([5, 6, 7, 8]);
	}

	private dropOffhand(): void {
		this.drop([45]);
	}

	private dropMainhand(): void {
		this.drop([minecraftBot.internal.quickBarSlot]);
	}

	private drop(slots: number[]): void {
		slots.forEach((slot, index) => {
			const item = minecraftBot.internal.inventory.slots[slot];
			if (item) { setTimeout(() => { minecraftBot.internal.tossStack(item).then(); }, index * 1000); }
		});
	}

	/*
	private drop(slots: number[]): void {
		if (slots.length === 0) { return; }
		const item = minecraftBot.internal.inventory.slots[slots[0]];
		if (item) {
			minecraftBot.internal.tossStack(item).then(() => {
				slots.shift();
				this.drop(slots);
			});
		}
		else {
			slots.shift();
			this.drop(slots);
		}
	}
	*/
}