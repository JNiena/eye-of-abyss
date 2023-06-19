import { Command } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { APIEmbed } from "discord.js";
import { Embeds } from "../../Embeds";
import { config, minecraftBot } from "../../Main";
import { PluginSubcommand } from "../../PluginSubcommand";
import { Util } from "../../Util";

export class AdvertiseCommand extends PluginSubcommand {
	public constructor(context: Subcommand.Context, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "advertise",
			"description": "Manages the advertisements.",
			"subcommands": [
				{ "name": "list", "chatInputRun": "chatInputList" },
				{ "name": "info", "chatInputRun": "chatInputInfo" },
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" },
				{ "name": "reset", "chatInputRun": "chatInputReset" },
				{ "name": "add", "chatInputRun": "chatInputAdd" },
				{ "name": "remove", "chatInputRun": "chatInputRemove" },
				{ "name": "edit", "chatInputRun": "chatInputEdit" }
			]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand(command => command
					.setName("list")
					.setDescription("Shows all advertisements.")
				)
				.addSubcommand(command => command
					.setName("info")
					.setDescription("Show the specified advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The advertisement to show.")
						.setMinLength(1)
						.setRequired(true)
					)
				)
				.addSubcommand(command => command
					.setName("enable")
					.setDescription("Enables the advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The advertisement to be enabled.")
						.setMinLength(1)
						.setRequired(true)
					)
				)
				.addSubcommand(command => command
					.setName("disable")
					.setDescription("Disables the advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The advertisement to be disabled.")
						.setMinLength(1)
						.setRequired(true)
					)
				)
				.addSubcommand(command => command
					.setName("reset")
					.setDescription("Resets the advertisements.")
				)
				.addSubcommand(command => command
					.setName("add")
					.setDescription("Adds an advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The name of the advertisement.")
						.setMinLength(1)
						.setRequired(true)
					)
					.addStringOption(option => option
						.setName("text")
						.setDescription("The text of the advertisement.")
						.setMinLength(1)
						.setRequired(true)
					)
					.addNumberOption(option => option
						.setName("interval")
						.setDescription("The interval in hours of the advertisement.")
						.setMinValue(1)
						.setRequired(true)
					)
					.addNumberOption(option => option
						.setName("randomizer")
						.setDescription("The randomizer in minutes of the advertisement.")
						.setMinValue(1)
						.setRequired(true)
					)
				)
				.addSubcommand(command => command
					.setName("remove")
					.setDescription("Removes an advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The name of the advertisement.")
						.setMinLength(1)
						.setRequired(true)
					)
				)
				.addSubcommand(command => command
					.setName("edit")
					.setDescription("Edits an advertisement.")
					.addStringOption(option => option
						.setName("name")
						.setDescription("The name of the advertisement.")
						.setMinLength(1)
						.setRequired(true)
					)
					.addStringOption(option => option
						.setName("text")
						.setDescription("The text of the advertisement.")
						.setMinLength(1)
						.setRequired(false)
					)
					.addNumberOption(option => option
						.setName("interval")
						.setDescription("The interval in hours of the advertisement.")
						.setMinValue(1)
						.setRequired(false)
					)
					.addNumberOption(option => option
						.setName("randomizer")
						.setDescription("The randomizer in minutes of the advertisement.")
						.setMinValue(1)
						.setRequired(false)
					)
				);
		}, { "idHints": ["1117561544633487495"] });
	}

	public override setup(): void {
		for (let i: number = 0; i < this.config().list.length; i++) {
			if (this.config().list[i].enable) {
				this.startAd(this.config().list[i]);
			}
		}
	}

	public async chatInputInfo(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | null = this.findAdByName(name);
		if (!ad) {
			return interaction.editReply({ "embeds": [this.adNotFound()] });
		}
		return interaction.editReply({ "embeds": [this.adInfo(ad)] });
	}

	public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		if (this.config().list.length === 0) {
			return interaction.editReply({ "embeds": [this.adEmpty()] });
		}
		return interaction.editReply({ "embeds": this.adList() });
	}

	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | null = this.findAdByName(name);
		if (!ad) {
			return interaction.editReply({ "embeds": [this.adNotFound()] });
		}
		if (ad.enable) {
			return interaction.editReply({ "embeds": [this.adAlreadyEnabled()] });
		}
		this.setAdStatus(ad, true);
		this.startAd(ad);
		return interaction.editReply({ "embeds": [this.adEnable()] });
	}

	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const ad: Advertisement | null = this.findAdByName(name);
		if (!ad) {
			return interaction.editReply({ "embeds": [this.adNotFound()] });
		}
		if (!ad.enable) {
			return interaction.editReply({ "embeds": [this.adAlreadyDisabled()] });
		}
		this.setAdStatus(ad, false);
		return interaction.editReply({ "embeds": [this.adDisable()] });
	}

	public async chatInputReset(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		this.config().list = [];
		config.save();
		return interaction.editReply({ "embeds": [this.adsReset()] });
	}

	public async chatInputAdd(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const text: string = interaction.options.getString("text", true);
		const interval: number = interaction.options.getNumber("interval", true);
		const randomizer: number = interaction.options.getNumber("randomizer", true);
		if (this.adExists(name)) {
			return interaction.editReply({ "embeds": [this.adAlreadyAdded(name)] });
		}
		this.config().list.push({
			"enable": true,
			"name": name,
			"text": text,
			"interval": interval * 3_600_000,
			"randomizer": randomizer * 60_000
		});
		config.save();
		return interaction.editReply({ "embeds": [this.adAdded(name)] });
	}

	public async chatInputRemove(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		if (this.adExists(name)) {
			this.config().list = this.config().list.filter((element: any) => element.name !== name);
			config.save();
			return interaction.editReply({ "embeds": [this.adRemoved(name)] });
		}
		return interaction.editReply({ "embeds": [this.adAlreadyRemoved(name)] });
	}

	public async chatInputEdit(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!this.isCorrectChannel(interaction)) { return; }
		await interaction.deferReply();
		const name: string = interaction.options.getString("name", true).toLowerCase();
		const text: string | null = interaction.options.getString("text", false);
		const interval: number | null = interaction.options.getNumber("interval", false);
		const randomizer: number | null = interaction.options.getNumber("randomizer", false);
		const ad: Advertisement | null = this.findAdByName(name);
		if (!ad) {
			return interaction.editReply({ "embeds": [this.adNotFound()] });
		}
		if (text) {
			ad.text = text;
		}
		if (interval) {
			ad.interval = interval * 3_600_000;
		}
		if (randomizer) {
			ad.randomizer = randomizer * 60_000;
		}
		config.save();
		return interaction.editReply({ "embeds": [this.adEdited(name)] });
	}

	private startAd(ad: Advertisement): void {
		setTimeout(() => {
			if (ad.enable) {
				if (minecraftBot.isConnected()) {
					minecraftBot.chat(ad.text);
				}
				this.startAd(ad);
			}
		}, ad.interval + Util.random(0, ad.randomizer));
	}

	private getAdChoices(): string[] {
		const choices: string[] = [];
		for (let i: number = 0; i < this.config().list.length; i++) {
			choices.push(this.config().list[i].name);
		}
		return choices;
	}

	private setAdStatus(ad: Advertisement, enable: boolean): void {
		ad.enable = enable;
		config.save();
	}

	private findAdByName(name: string): Advertisement | null {
		for (let i: number = 0; i < this.config().list.length; i++) {
			if (this.config().list[i].name === name) {
				return this.config().list[i];
			}
		}
		return null;
	}

	private adExists(name: string): boolean {
		return this.findAdByName(name) !== null;
	}

	private adList(): APIEmbed[] {
		const embeds: APIEmbed[] = [];
		for (let i: number = 0; i < this.config().list.length; i++) {
			const ad: Advertisement = this.config().list[i];
			const embed: APIEmbed = this.adInfo(ad);
			embeds.push(embed);
		}
		return embeds;
	}

	private adInfo(ad: Advertisement): APIEmbed {
		const embed: APIEmbed = Embeds.template(`Advertisement \`${ad.name}\``, "");
		embed.fields = [
			{
				"name": "__Enabled__",
				"value": `${ad.enable}`
			},
			{
				"name": "__Text__",
				"value": ad.text
			},
			{
				"name": "__Interval__",
				"value": `${ad.interval / 3_600_000}h`
			},
			{
				"name": "__Randomizer__",
				"value": `${ad.randomizer / 60_000}m`
			}
		];
		return embed;
	}

	private adEmpty(): APIEmbed {
		return Embeds.template("Advertisements Empty", "The advertisements are empty!");
	}

	private adNotFound(): APIEmbed {
		return Embeds.template("Advertisement Not Found", "The advertisement does not exist!");
	}

	private adEnable(): APIEmbed {
		return Embeds.template("Advertisement Enabled", "The advertisement has been enabled!");
	}

	private adAlreadyEnabled(): APIEmbed {
		return Embeds.template("Advertisement Already Enabled", "The advertisement is already enabled!");
	}

	private adDisable(): APIEmbed {
		return Embeds.template("Advertisement Disabled", "The advertisement has been disabled!");
	}

	private adAlreadyDisabled(): APIEmbed {
		return Embeds.template("Advertisement Enabled", "The advertisement is already disabled!");
	}

	private adsReset(): APIEmbed {
		return Embeds.template("Advertisements Reset", "The advertisements have been reset!");
	}

	private adAdded(name: string): APIEmbed {
		return Embeds.template("Advertisement Added", `\`${name}\` was added to the advertisements!`);
	}

	private adAlreadyAdded(name: string): APIEmbed {
		return Embeds.template("Advertisement Already Added", `\`${name}\` is already added to the advertisements!`);
	}

	private adRemoved(name: string): APIEmbed {
		return Embeds.template("Advertisement Removed", `\`${name}\` was removed from the advertisements!`);
	}

	private adAlreadyRemoved(name: string): APIEmbed {
		return Embeds.template("Advertisement Already Removed", `\`${name}\` is already removed from the advertisements!`);
	}

	private adEdited(name: string): APIEmbed {
		return Embeds.template("Advertisement Edited", `\`${name}\` has been edited!`);
	}
}

export type Advertisement = { "enable": boolean, "name": string, "text": string, "interval": number, "randomizer": number }