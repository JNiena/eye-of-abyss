import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class DropCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "drop",
			"description": "Drops the bot's inventory."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1094050994960212058"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		this.dropItems();
		return interaction.editReply({ "embeds": [Embeds.itemsDropped()] });
	}

	private dropItems(): void {
		const items = minecraftBot.internal().inventory.items();
		for (let i: number = 0; i < items.length; i++) {
			setTimeout(() => {
				minecraftBot.internal().tossStack(items[i]).then();
			}, i * 500);
		}
	}
}