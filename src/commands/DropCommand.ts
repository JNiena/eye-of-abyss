import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";

export class DropCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "drop",
			"description": "Drops items from the bot's inventory, armor, mainhand, or offhand.",
			"subcommands": [
				{ "name": "inventory", "chatInputRun": "chatInputInventory" },
				{ "name": "armor", "chatInputRun": "chatInputArmor" },
				{ "name": "offhand", "chatInputRun": "chatInputOffhand" },
				{ "name": "mainhand", "chatInputRun": "chatInputMainhand" }
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("inventory").setDescription("Drops the bot's inventory."))
				.addSubcommand(command => command.setName("armor").setDescription("Drops the bot's armor."))
				.addSubcommand(command => command.setName("offhand").setDescription("Drops the bot's offhand."))
				.addSubcommand(command => command.setName("mainhand").setDescription("Drops the bot's mainhand."));
		}, { "idHints": ["1094050994960212058"] });
	}

	public async chatInputInventory(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		this.drop([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]);
		return interaction.reply({ "embeds": [Embeds.inventoryDropped()] });
	}

	public async chatInputArmor(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		this.drop([5, 6, 7, 8]);
		return interaction.reply({ "embeds": [Embeds.armorDropped()] });
	}

	public async chatInputOffhand(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		this.drop([45]);
		return interaction.reply({ "embeds": [Embeds.offhandDropped()] });
	}

	public async chatInputMainhand(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		this.drop([minecraftBot.internal.quickBarSlot]);
		return interaction.reply({ "embeds": [Embeds.mainhandDropped()] });
	}

	private drop(slots: number[]): void {
		let i: number = 0;
		for (const slot of slots) {
			const item = minecraftBot.internal.inventory.slots[slot];
			if (item) {
				setTimeout(() => { minecraftBot.internal.tossStack(item).then(); }, i * 1000);
				i++;
			}
		}
	}
}