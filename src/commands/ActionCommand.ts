import { Embeds } from "../Embeds";
import { minecraftBot } from "../Main";
import { Subcommand } from "@sapphire/plugin-subcommands";

export class ActionCommand extends Subcommand {
	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "action",
			"description": "Performs an action.",
			"preconditions": ["ValidChannel"],
			"subcommands": [
				{ "name": "left", "chatInputRun": "chatInputLeft" },
				{ "name": "right", "chatInputRun": "chatInputRight" },
				{ "name": "forward", "chatInputRun": "chatInputForward" },
				{ "name": "back", "chatInputRun": "chatInputBack" },
				{ "name": "jump", "chatInputRun": "chatInputJump" },
				{ "name": "sneak", "chatInputRun": "chatInputSneak" },
				{ "name": "sprint", "chatInputRun": "chatInputSprint" },
				{ "name": "stop", "chatInputRun": "chatInputStop" }
			]
		});
	}

	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("left").setDescription("Makes the bot move left.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will move left.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("right").setDescription("Makes the bot move right.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will move right.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("forward").setDescription("Makes the bot move forward.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will move forward.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("back").setDescription("Makes the bot move back.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will move back.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("jump").setDescription("Makes the bot jump.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will jump.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("sneak").setDescription("Makes the bot sneak.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will sneak.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("sprint").setDescription("Makes the bot sprint.")
					.addNumberOption(option => option.setName("time").setDescription("The amount of time the bot will sprint.").setRequired(false).setMinValue(1)))
				.addSubcommand(command => command.setName("stop").setDescription("Makes the stop."));
		}, { "idHints": ["1218760382357835947"] });
	}

	public async chatInputLeft(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("left", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputRight(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("right", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputForward(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("forward", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputBack(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("back", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputJump(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("jump", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputSneak(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("sneak", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputSprint(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		const time: number = interaction.options.getNumber("time", false) ?? 1;
		setTimeout(() => { minecraftBot.internal.setControlState("sprint", false); }, time * 1000);
		return interaction.reply({ "embeds": [Embeds.actionStarted()] });
	}

	public async chatInputStop(interaction: Subcommand.ChatInputCommandInteraction) {
		if (!minecraftBot.connected) { return interaction.reply({ "embeds": [Embeds.offline()] }); }
		minecraftBot.internal.clearControlStates();
		return interaction.reply({ "embeds": [Embeds.actionStopped()] });
	}
}