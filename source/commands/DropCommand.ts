import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class DropCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "drop",
			// @ts-ignore
			"preconditions": ["IsValidChannel"],
			"description": "Drops every item in the account's inventory."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094050994960212058"] });
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		this.dropItems();
		return interaction.editReply({ "embeds": [Embeds.itemsDropped()] });
	}

	private dropItems(): void {
		const items = minecraftBot.items();
		for (let i: number = 0; i < items.length; i++) {
			setTimeout(() => {
				minecraftBot.tossStack(items[i]);
			}, i * 500);
		}
	}
}