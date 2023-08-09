import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, Message, SlashCommandStringOption } from "discord.js";
import { ChannelCommand } from "../ChannelCommand";
import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";

export class DropCommand extends ChannelCommand {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "drop",
			"description": "Drops the bot's items."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(option => this.addSectionChoices(option)
					.setName("section")
					.setDescription("The section of the bot's inventory to drop.")
					.setRequired(true)
				);
		}, { "idHints": ["1094050994960212058"] });
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const section: string = interaction.options.getString("section", true);
		if (section === "inventory") {
			this.dropInventory();
			return interaction.editReply({ "embeds": [Embeds.inventoryDropped()] });
		}
		else if (section === "armor") {
			this.dropArmor();
			return interaction.editReply({ "embeds": [Embeds.armorDropped()] });
		}
		else if (section === "offhand") {
			this.dropOffhand();
			return interaction.editReply({ "embeds": [Embeds.offhandDropped()] });
		}
		else if (section === "mainhand") {
			this.dropMainhand();
			return interaction.editReply({ "embeds": [Embeds.mainhandDropped()] });
		}
		return interaction.editReply({ "embeds": [Embeds.invalidOption()] });
	}

	public addSectionChoices(option: SlashCommandStringOption): SlashCommandStringOption {
		return option.addChoices(
			{
				"name": "inventory",
				"value": "inventory"
			},
			{
				"name": "armor",
				"value": "armor"
			},
			{
				"name": "offhand",
				"value": "offhand"
			},
			{
				"name": "mainhand",
				"value": "mainhand"
			}
		);
	}

	private dropInventory(): void {
		const items = minecraftBot.internal().inventory.items();
		for (let i: number = 0; i < items.length; i++) {
			setTimeout(() => {
				minecraftBot.internal().tossStack(items[i]).then();
			}, i * 500);
		}
	}

	private dropArmor(): void {
		for (let i: number = 5; i <= 8; i++) {
			setTimeout(() => {
				const item = minecraftBot.internal().inventory.slots[i];
				if (item) {
					minecraftBot.internal().tossStack(item).then();
				}
			}, i * 500);
		}
	}

	private dropOffhand(): void {
		const item = minecraftBot.internal().inventory.slots[45];
		if (item) {
			minecraftBot.internal().tossStack(item).then();
		}
	}

	private dropMainhand(): void {
		const item = minecraftBot.internal().inventory.slots[minecraftBot.internal().quickBarSlot];
		if (item) {
			minecraftBot.internal().tossStack(item).then();
		}
	}
}