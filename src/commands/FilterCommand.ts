import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config } from "../Main";

export class FilterCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "filter",
			"description": "Modifies the filter.",
			"subcommands": [
				{ "name": "list", "chatInputRun": "chatInputList", },
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" },
				{ "name": "reset", "chatInputRun": "chatInputReset" },
				{ "name": "add", "chatInputRun": "chatInputAdd" },
				{ "name": "remove", "chatInputRun": "chatInputRemove" },
				{ "name": "paste", "chatInputRun": "chatInputPaste" }
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("list").setDescription("Shows all items on the filter."))
				.addSubcommand(command => command.setName("enable").setDescription("Enables the filter."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables the filter."))
				.addSubcommand(command => command.setName("reset").setDescription("Resets the filter."))
				.addSubcommand(command => command.setName("add").setDescription("Adds an item to the filter.")
					.addStringOption(option => option.setName("item").setDescription("The item.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("remove").setDescription("Removes an item from the filter.")
					.addStringOption(option => option.setName("item").setDescription("The item.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("paste").setDescription("Pastes a list to the filter.")
					.addStringOption(option => option.setName("list").setDescription("The list.").setMinLength(1).setRequired(true)));
		}, { "idHints": ["1226024472700653630"] });
	}

	public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (config.get().filter.list.length === 0) { return interaction.reply({ "embeds": [Embeds.filterEmpty()] }); }
		return interaction.reply({ "embeds": [Embeds.filterList(config.get().filter.list)] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().filter.enable = true;
		config.save();
		return interaction.reply({ "embeds": [Embeds.filterEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().filter.enable = false;
		config.save();
		return interaction.reply({ "embeds": [Embeds.filterDisabled()] });
	}

	public async chatInputReset(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().filter.list = [];
		config.save();
		return interaction.reply({ "embeds": [Embeds.filterReset()] });
	}

	public async chatInputAdd(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const item: string = interaction.options.getString("item", true);
		if (config.get().filter.list.includes(item)) { return interaction.reply({ "embeds": [Embeds.filterAlreadyAdded(item)] }); }
		config.get().filter.list.push(item);
		config.save();
		return interaction.reply({ "embeds": [Embeds.filterAdded(item)] });
	}

	public async chatInputRemove(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const item: string = interaction.options.getString("item", true);
		if (config.get().filter.list.includes(item)) {
			config.get().filter.list = config.get().filter.list.filter((element: string) => element !== item);
			config.save();
			return interaction.reply({ "embeds": [Embeds.filterRemoved(item)] });
		}
		return interaction.reply({ "embeds": [Embeds.filterAlreadyRemoved(item)] });
	}

	public async chatInputPaste(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const list: string = interaction.options.getString("list", true);
		config.get().filter.list = list.split(", ");
		config.save();
		return interaction.reply({ "embeds": [Embeds.filterPasted()] });
	}
}