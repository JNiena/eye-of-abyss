import { Command } from "@sapphire/framework";
import { APIEmbed, ChatInputCommandInteraction, Guild, Message, VoiceChannel } from "discord.js";
import { Config } from "../../Config";
import { Embeds } from "../../Embeds";
import { minecraftBot } from "../../Main";
import { PluginCommand } from "../../PluginCommand";

export class CalculateCommand extends PluginCommand {
	private coinChannelID: string = "1036858453060231198";
	private moneyChannelID: string = "1036858727925547021";
	private guildID: string = "866073594610057216";

	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			"name": "calculate",
			"description": "Calculates all the balances of each bot."
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName(this.name)
				.setDescription(this.description);
		}, { "idHints": ["1105624907653599282"] });
	}

	public override setup(): void {
		setInterval(() => {
			const currency: { "money": number, "coins": number } = this.findCurrency();
			this.persistCurrency("money", currency.money);
			this.persistCurrency("coins", currency.coins);
		}, 60_000);
		if (this.config().autoUpdate) {
			setInterval(() => {
				const guild: Guild | undefined = this.container.client.guilds.cache.get(this.guildID);
				this.updateChannel(guild);
			}, 3_600_000);
		}
	}

	public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
		await interaction.deferReply();
		const currency: { "money": number, "coins": number } = this.findTotalCurrency();
		this.updateChannel(interaction.guild);
		return interaction.editReply({ "embeds": [this.balancesCalculated(currency.money, currency.coins)] });
	}

	public findCurrency(): { "money": number, "coins": number } {
		let currency: { "money": number, "coins": number } = { "money": 0, "coins": 0 };
		Object.keys(minecraftBot.internal().scoreboards).forEach((scoreboardName: string) => {
			minecraftBot.internal().scoreboards[scoreboardName].items.forEach(item => {
				const target: string = item.displayName.toString().toLowerCase();
				if (target.includes("money")) {
					currency.money = this.currencyToNumber(target.substring(target.indexOf("$") + 1));
				}
				if (target.includes("coins")) {
					currency.coins = this.currencyToNumber(target.substring(target.indexOf(": ") + 2));
				}
			});
		});
		return currency;
	}

	private persistCurrency(type: string, amount: number): void {
		const balances: Config = new Config("balances.json");
		if (!balances.get()[minecraftBot.internal().username]) {
			balances.get()[minecraftBot.internal().username] = {
				"money": 0,
				"coins": 0
			};
		}
		balances.get()[minecraftBot.internal().username][type] = Math.round(amount);
		balances.save();
	}

	private findTotalCurrency(): { "money": number, "coins": number } {
		const balances: Config = new Config("balances.json");
		const currency: { "money": number, "coins": number } = { "money": 0, "coins": 0 };
		Object.keys(balances.get()).forEach(key => {
			currency.money += Math.round(balances.get()[key]["money"]);
			currency.coins += Math.round(balances.get()[key]["coins"]);
		});
		return currency;
	}

	private updateChannel(guild: Guild | null | undefined) {
		const currency: { "money": number, "coins": number } = this.findTotalCurrency();
		if (guild) {
			(guild.channels.cache.get(this.coinChannelID) as VoiceChannel).setName(`Coins: ${currency.coins}`).then();
			(guild.channels.cache.get(this.moneyChannelID) as VoiceChannel).setName(`Money: ${currency.money}`).then();
		}
	}

	private currencyToNumber(currency: string): number {
		const map: Map<string, number> = new Map([
			["k", 1_000],
			["m", 1_000_000],
			["b", 1_000_000_000]
		]);
		const multiplier: number | undefined = map.get(currency.charAt(currency.length - 1));
		let numericalCurrency: number = parseFloat(currency.replace("k", "").replace("m", "").replace("b", ""));
		if (multiplier) {
			numericalCurrency *= multiplier;
		}
		return numericalCurrency;
	}

	private balancesCalculated(money: number, coins: number): APIEmbed {
		const embed: APIEmbed = Embeds.template("Balances Calculated", "The combined balances of the bots has been calculated!");
		embed.fields = [
			{
				"name": "Money",
				"value": money.toString(),
				"inline": false
			},
			{
				"name": "Coins",
				"value": coins.toString(),
				"inline": false
			}
		];
		return embed;
	}
}