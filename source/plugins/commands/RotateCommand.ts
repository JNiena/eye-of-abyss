import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Message } from "discord.js";
import { Embeds } from "../../Embeds";
import { config, discordBot, minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";
import { Util } from "../../Util";

export class RotateCommand extends PluginCommand {
	private rotateChannelID: string = "1106685119860834495";

	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "rotate",
			"description": "Rotates the password for AbyssSP."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1106687160846921840"] });
	}

	public override setup(): void {
		setInterval(() => {
			if (!this.config().time || Date.now() >= this.config().time) {
				discordBot.sendEmbed(this.passwordRotated(this.rotatePassword()), this.rotateChannelID).then();
				this.config().time = Date.now() + this.config().interval;
				config.save();
			}
		}, 600_000);
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const password: number = this.rotatePassword();
		discordBot.sendEmbed(this.passwordRotated(password), this.rotateChannelID).then();
		return interaction.editReply({ "embeds": [this.passwordRotated(password)] });
	}

	private rotatePassword(): number {
		const password: number = Util.random(1_000, 9_999);
		minecraftBot.chat("/pw password remove AbyssSP");
		minecraftBot.chat(`/pw password set AbyssSP ${password}`, 1_000);
		return password;
	}

	private passwordRotated(password: number): APIEmbed {
		return Embeds.template("AbyssPS Password", `The new password for AbyssPS is \`${password}\``);
	}
}