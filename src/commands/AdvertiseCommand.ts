import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";
import { Util } from "../Util";

export class AdvertiseCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "advertise",
			"aliases": ["ad", "advertisement"],
			"description": "Modifies the advertisements.",
			"subcommands": [
				{ "name": "list", "chatInputRun": "chatInputList" },
				{ "name": "info", "chatInputRun": "chatInputInfo" },
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" },
				{ "name": "reset", "chatInputRun": "chatInputReset" },
				{ "name": "add", "chatInputRun": "chatInputAdd", },
				{ "name": "remove", "chatInputRun": "chatInputRemove" },
				{ "name": "edit", "chatInputRun": "chatInputEdit" },
			]
		});
		for (const ad of config.get().advertisements) {
			this.startAd(ad.name);
		}
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("list").setDescription("Shows all advertisements."))
				.addSubcommand(command => command.setName("info").setDescription("Show the specified advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The advertisement to show.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("enable").setDescription("Enables the advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The advertisement to be enabled.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("disable").setDescription("Disables the advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The advertisement to be disabled.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("reset").setDescription("Resets the advertisements."))
				.addSubcommand(command => command.setName("add").setDescription("Adds an advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The name of the advertisement.").setMinLength(1).setRequired(true))
					.addStringOption(option => option.setName("text").setDescription("The text of the advertisement.").setMinLength(1).setRequired(true))
					.addNumberOption(option => option.setName("interval").setDescription("The interval in minutes of the advertisement.").setMinValue(1).setRequired(true))
					.addNumberOption(option => option.setName("randomizer").setDescription("The randomizer in minutes of the advertisement.").setMinValue(1).setRequired(true)))
				.addSubcommand(command => command.setName("remove").setDescription("Removes an advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The name of the advertisement.").setMinLength(1).setRequired(true)))
				.addSubcommand(command => command.setName("edit").setDescription("Edits an advertisement.")
					.addStringOption(option => option.setName("name").setDescription("The name of the advertisement.").setMinLength(1).setRequired(true))
					.addStringOption(option => option.setName("text").setDescription("The text of the advertisement.").setMinLength(1).setRequired(false))
					.addNumberOption(option => option.setName("interval").setDescription("The interval in minutes of the advertisement.").setMinValue(1).setRequired(false))
					.addNumberOption(option => option.setName("randomizer").setDescription("The randomizer in minutes of the advertisement.").setMinValue(1).setRequired(false)));
		}, { "idHints": ["1117561544633487495"] });
	}

	public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (config.get().advertisements.length === 0) { return interaction.reply({ "embeds": [Embeds.adsEmpty()] }); }
		return interaction.reply({ "embeds": [Embeds.adList(config.get().advertisements)] });
	}

	public async chatInputInfo(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return interaction.reply({ "embeds": [Embeds.adNotFound()] }); }
		return interaction.reply({ "embeds": [Embeds.adInfo(ad)] });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return interaction.reply({ "embeds": [Embeds.adNotFound()] }); }
		ad.enable = true;
		config.save();
		return interaction.reply({ "embeds": [Embeds.adEnabled()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return interaction.reply({ "embeds": [Embeds.adNotFound()] }); }
		ad.enable = false;
		config.save();
		return interaction.reply({ "embeds": [Embeds.adDisabled()] });
	}

	public async chatInputReset(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		config.get().advertisements = [];
		config.save();
		return interaction.reply({ "embeds": [Embeds.adsReset()] });
	}

	public async chatInputAdd(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const text: string = interaction.options.getString("text", true);
		const interval: number = interaction.options.getNumber("interval", true);
		const randomizer: number = interaction.options.getNumber("randomizer", true);
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (ad) { return interaction.reply({ "embeds": [Embeds.adAlreadyAdded(name)] }); }
		config.get().advertisements.push({ "enable": true, "name": name, "text": text, "interval": interval * 60_000, "randomizer": randomizer * 60_000 });
		config.save();
		this.startAd(name);
		return interaction.reply({ "embeds": [Embeds.adAdded(name)] });
	}

	public async chatInputRemove(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return interaction.reply({ "embeds": [Embeds.adAlreadyRemoved(name)] }); }
		config.get().advertisements = config.get().advertisements.filter((ad: Advertisement) => ad.name !== name);
		config.save();
		return interaction.reply({ "embeds": [Embeds.adRemoved(name)] });
	}

	public async chatInputEdit(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const text: string | null = interaction.options.getString("text", false);
		const interval: number | null = interaction.options.getNumber("interval", false);
		const randomizer: number | null = interaction.options.getNumber("randomizer", false);
		const ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return interaction.reply({ "embeds": [Embeds.adAlreadyRemoved(name)] }); }
		if (text) { ad.text = text; }
		if (interval) { ad.interval = interval * 60_000; }
		if (randomizer) { ad.randomizer = randomizer * 60_000; }
		config.save();
		return interaction.reply({ "embeds": [Embeds.adEdited(name)] });
	}

	private startAd(name: string) {
		let ad: Advertisement | undefined = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
		if (!ad) { return; }
		setTimeout(() => {
			ad = config.get().advertisements.find((ad: Advertisement) => ad.name === name);
			if (ad?.enable) {
				if (minecraftBot.connected) { minecraftBot.chat(ad.text); }
				this.startAd(ad.name);
			}
		}, ad.interval + Util.random(0, ad.randomizer));
	}
}

export type Advertisement = { "enable": boolean, "name": string, "text": string, "interval": number, "randomizer": number }