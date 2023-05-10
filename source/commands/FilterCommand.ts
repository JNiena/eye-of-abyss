import { Command } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class FilterCommand extends Subcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "filter",
			"description": "Modifies the filter.",
			"subcommands": [
				{ "name": "list", "chatInputRun": "chatInputList" },
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" },
				{ "name": "reset", "chatInputRun": "chatInputReset" },
				{ "name": "add", "chatInputRun": "chatInputAdd" },
				{ "name": "remove", "chatInputRun": "chatInputRemove" }
			]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand(command => command.setName("list").setDescription("Shows all items on the filter."))
				.addSubcommand(command => command.setName("enable").setDescription("Enables the filter."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables the filter."))
				.addSubcommand(command => command.setName("reset").setDescription("Resets the filter."))
				.addSubcommand(command => command.setName("add").setDescription("Adds an item to the filter.")
					.addStringOption(option => option.setName("item").setDescription("The item to be added to the filter.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("remove").setDescription("Removes an item from the filter.")
					.addStringOption(option => option.setName("item").setDescription("The item to be removed from the filter.").setMinLength(1).setRequired(true)));
		}, { "idHints": ["1094050997183184906"] });
	}

	public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		if (config.get().filter.list.length === 0) {
			return interaction.editReply({ "embeds": [Embeds.filterEmpty()] });
		}
		return interaction.editReply({ "embeds": [Embeds.filterList(config.get().filter.list)] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		config.get().filter.enable = true;
		config.save();
		return interaction.editReply({ "embeds": [Embeds.filterEnable()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		config.get().filter.enable = false;
		config.save();
		return interaction.editReply({ "embeds": [Embeds.filterDisable()] });
	}

	public async chatInputReset(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		config.get().filter.list = [];
		config.save();
		return interaction.editReply({ "embeds": [Embeds.filterReset()] });
	}

	public async chatInputAdd(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		const item: string = interaction.options.getString("item", true).toLowerCase();
		if (config.get().filter.list.includes(item)) {
			return interaction.editReply({ "embeds": [Embeds.filterAlreadyAdded(item)] });
		}
		config.get().filter.list.push(item);
		config.save();
		return interaction.editReply({ "embeds": [Embeds.filterAdded(item)] });
	}

	public async chatInputRemove(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.channelID !== interaction.channelId) { return; }
		await interaction.deferReply();
		const item: string = interaction.options.getString("item", true).toLowerCase();
		if (config.get().filter.list.includes(item)) {
			config.get().filter.list = config.get().filter.list.filter((element: string) => element !== item);
			config.save();
			return interaction.editReply({ "embeds": [Embeds.filterRemoved(item)] });
		}
		return interaction.editReply({ "embeds": [Embeds.filterAlreadyRemoved(item)] });
	}
}