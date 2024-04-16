import { Subcommand } from "@sapphire/plugin-subcommands";
import { Embeds } from "../../Embeds";
import { config, discordBot, minecraftBot } from "../../Main";
import { BossBar } from "mineflayer";

export class BossAlertCommand extends Subcommand {
	private bosses: string[];
	private bossIndex: number;
	private enable: boolean;
	private blockedPings: string[];

	public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
		super(context, {
			...options,
			"name": "bossalert",
			"description": "Manages the boss alert configuration.",
			"preconditions": ["PluginEnabled"],
			"subcommands": [
				{ "name": "enable", "chatInputRun": "chatInputEnable" },
				{ "name": "disable", "chatInputRun": "chatInputDisable" }
			]
		});

		// Set our inital values.
		this.bosses = ["queenbee", "levian", "minotaur", "valkyrie", "azalea", "starserpent", "warden", "wither", "enderdragon", "soulknight", "yukima", "erebus", "thanatos"];
		this.bossIndex = 0;
		this.enable = true;
		this.blockedPings = [];

		if (!config.get().plugins.includes("bossalert")) { return; }

		// Warp through all bosses every 15 seconds (+5 seconds because of /warp command delay).
		setInterval(() => {
			if (!minecraftBot.connected || !this.enable) { return; }
			minecraftBot.chat(`/warp ${this.bosses[this.bossIndex]}`);

			// Increment the index if we're not at the end of the list. Set it back to 0 if we are.
			if (this.bossIndex == this.bosses.length - 1) { this.bossIndex = 0; }
			else { this.bossIndex += 1; }
		}, 15_000);

		// Send a message to discord when the bossBarCreated event is activated. 
		minecraftBot.startup.push(() => {
			minecraftBot.internal.on("bossBarCreated", (bossBar: BossBar) => {
				if (!this.enable) { return; }
				if (!this.blockedPings.includes(bossBar.entityUUID)) {
					discordBot.sendEmbed(Embeds.template(`${bossBar.title}`, "<@&1229668800291405935>"), "1123358693447192617");

					// Block the attempt to send a message for the corresponding boss for the next ten minutes.
					this.blockedPings.push(bossBar.entityUUID);
					setTimeout(() => { this.blockedPings = this.blockedPings.filter(blockedPing => blockedPing !== bossBar.entityUUID); }, 600_000);
				}
			});
		});
	}

	// Register the command and it's structure.
	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description)
				.addSubcommand(command => command.setName("enable").setDescription("Enables the boss-alert system."))
				.addSubcommand(command => command.setName("disable").setDescription("Disables the boss-alert system."));
		}, { "idHints": ["1229582773866463263"] });
	}

	// Ran on /bossalert enable.
	public async chatInputEnable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		this.enable = true;
		return interaction.reply({ "embeds": [Embeds.template("Boss-Alert System Disabled")] });
	}

	// Ran on /bossalert disable.
	public async chatInputDisable(interaction: Subcommand.ChatInputCommandInteraction) {
		if (config.get().discord.chatChannelID !== interaction.channelId) { return; }
		this.enable = false;
		return interaction.reply({ "embeds": [Embeds.template("Boss-Alert System Enabled")] });
	}
}

// Fix the dev's shitty code so we can use the bossBarCreated event.
declare module "mineflayer" {
	interface BotEvents {
		bossBarCreated: (bossBar: BossBar) => Promise<void> | void
	}
}