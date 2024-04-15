import { Embeds } from "../Embeds";
import { config, minecraftBot } from "../Main";
import { SlashCommandStringOption } from "discord.js";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ControlState } from "mineflayer";

export class ActionCommand extends Subcommand {
	private intervals: Map<string, NodeJS.Timeout>;

	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "action",
			"description": "Performs an action.",
			"subcommands": [
				{ "name": "interval", "chatInputRun": "chatInputInterval" },
				{ "name": "once", "chatInputRun": "chatInputOnce" },
				{ "name": "stop", "chatInputRun": "chatInputStop" }
			]
		});
		this.intervals = new Map();
		this.initializeActions();
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("interval").setDescription("Performs an action at the set interval.")
					.addStringOption(option => this.createChoices(option).setName("action").setDescription("The action.").setRequired(true).setMinLength(1))
					.addNumberOption(option => option.setName("time").setDescription("The interval in minutes for the action to be performed.").setRequired(true).setMinValue(1)))
				.addSubcommand(command => command.setName("once").setDescription("Performs an action for the set time.")
					.addStringOption(option => this.createChoices(option).setName("action").setDescription("The action.").setRequired(true).setMinLength(1))
					.addNumberOption(option => option.setName("time").setDescription("The time in seconds for the action to be performed.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("stop").setDescription("Stops an action.")
					.addStringOption(option => this.createChoices(option).setName("action").setDescription("The action.").setRequired(false).setMinLength(1)));
		}, { "idHints": ["1226024555659919372"] });
	}

	private createChoices(option: SlashCommandStringOption) {
		return option.addChoices(
			{ "name": "left", "value": "left" },
			{ "name": "right", "value": "right" },
			{ "name": "forward", "value": "forward" },
			{ "name": "back", "value": "back" },
			{ "name": "jump", "value": "jump" },
			{ "name": "sprint", "value": "sprint" },
			{ "name": "sneak", "value": "sneak" }
		);
	}

	public async chatInputInterval(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		return interaction.reply({ "embeds": [Embeds.template("Disabled Command", "This command is disabled because it could potentially get us banned.")] });
		// const action: string = interaction.options.getString("action", true);
		// const interval: number = interaction.options.getNumber("time", true);
		// this.createActionInterval(action, interval * 60_000);
		// this.startActionInterval(action, interval * 60_000);
		// return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputOnce(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const action: string = interaction.options.getString("action", true);
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		this.startActionOnce(action, time * 1_000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputStop(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const action: string | null = interaction.options.getString("action", false);
		if (action) { this.stopAction(action); }
		else { this.stopActions(); }
		return interaction.reply({ "embeds": [Embeds.actionStopped()] });
	}

	private createActionInterval(action: string, interval: number) {
		config.get().actions[action] = interval;
		config.save();
	}

	private startActionInterval(action: string, interval: number) {
		if (interval <= 0) { return; }
		this.intervals.set(action, setInterval(() => {
			if (minecraftBot.connected) {
				minecraftBot.internal.setControlState(action as ControlState, true);
				setTimeout(() => { minecraftBot.internal.setControlState(action as ControlState, false); }, 500);
			}
		}, interval));
	}

	private startActionOnce(action: string, time: number) {
		if (time <= 0) { return; }
		minecraftBot.internal.setControlState(action as ControlState, true);
		setTimeout(() => { minecraftBot.internal.setControlState(action as ControlState, false); }, time);
	}

	private initializeActions() {
		for (const action in config.get().actions) { this.startActionInterval(action, config.get().actions[action]); }
	}

	private stopAction(action: string) {
		clearInterval(this.intervals.get(action));
		minecraftBot.internal.setControlState(action as ControlState, false);
		config.get().actions[action] = 0;
		config.save();
	}

	private stopActions() {
		for (const action in config.get().actions) { this.stopAction(action); }
	}
}