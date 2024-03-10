import { APIEmbed } from "discord.js";
import { minecraftBot } from "./Main";
import { Log } from "./MinecraftBot";
import { Advertisement } from "./commands/AdvertiseCommand";
import { CommandInfo, commands_info } from "./CommandInfo";

export class Embeds {
	public static readonly green: number = 2817792;
	public static readonly red: number = 16711680;
	public static readonly neutral: number = 7803166;

	// TEMPLATE
	public static template(title: string, description: string = "", color: number = this.neutral): APIEmbed {
		return {
			"title": title,
			"description": description,
			"color": color,
			"thumbnail": { "url": `https://cravatar.eu/helmavatar/${minecraftBot.internal.username}/24.png` }
		};
	}

	// CONNECTION
	public static connected(): APIEmbed { return this.template(`\`${minecraftBot.internal.username}\` Connected`); }
	public static alreadyConnected(): APIEmbed { return this.template("Already Connected"); }
	public static disconnected(info: Log | undefined = undefined): APIEmbed {
		if (!info) { return this.template(`\`${minecraftBot.internal.username}\` Disconnected`); }
		const embed: APIEmbed = this.template(`${info.type} \`${minecraftBot.internal.username}\``);
		embed.fields = [{ "name": "Reason", "value": info.message }];
		return embed;
	}
	public static alreadyDisconnected(): APIEmbed { return this.template("Already Disconnected"); }

	// MISC
	public static death(): APIEmbed { return this.template(`Death \`${minecraftBot.internal.username}\``); }
	public static messageSent(): APIEmbed { return this.template("Message Sent"); }

	// AUTO-RECONNECT
	public static autoReconnectEnabled(): APIEmbed { return this.template("Auto-Reconnect Enabled"); }
	public static autoReconnectDisabled(): APIEmbed { return this.template("Auto-Reconnect Disabled"); }

	// STATUS
	public static online(): APIEmbed { return this.template("Online"); }
	public static offline(): APIEmbed { return this.template("Offline"); }

	// SERVER
	public static hostSet(): APIEmbed { return this.template("Host Set"); }
	public static portSet(): APIEmbed { return this.template("Port Set"); }
	public static versionSet(): APIEmbed { return this.template("Version Set"); }

	// COMMAND
	public static commandExecuted(): APIEmbed { return this.template("Command Executed"); }
	public static commandNotFound(): APIEmbed { return this.template("Command Not Found"); }

	// VALIDATION
	public static invalidOption(): APIEmbed { return this.template("Invalid Option"); }
	public static invalidArguments(): APIEmbed { return this.template("Invalid Arguments"); }

	// DROP
	public static inventoryDropped(): APIEmbed { return this.template("Inventory Dropped"); }
	public static armorDropped(): APIEmbed { return this.template("Armor Dropped"); }
	public static offhandDropped(): APIEmbed { return this.template("Offhand Dropped"); }
	public static mainhandDropped(): APIEmbed { return this.template("Mainhand Dropped"); }

	// HELP
	public static helpInfo(name: string) {
		const command_info: CommandInfo = commands_info.find((command) => command.name === name)!;
		return this.template(name, `**\`${command_info.usage}\`**\n${command_info.description}\n\n`);
	}
	public static helpList(names: string[]): APIEmbed {
		let formatted = "";
		for (const command of names) { formatted += this.helpInfo(command).description; }
		return this.template("Commands", formatted);
	}

	// ACTION
	public static actionStarted(): APIEmbed { return this.template("Action Started"); }
	public static actionStopped(): APIEmbed { return this.template("Action Stopped"); }

	// LOGGER
	public static loggerEnabled(): APIEmbed { return this.template("Logger Enabled"); }
	public static loggerDisabled(): APIEmbed { return this.template("Logger Disabled"); }
	public static loggerPath(): APIEmbed { return this.template("Logger Path"); }

	// FILTER
	public static filterEnabled(): APIEmbed { return this.template("Filter Enabled"); }
	public static filterAlreadyEnabled(): APIEmbed { return this.template("Filter Already Enabled"); }
	public static filterDisabled(): APIEmbed { return this.template("Filter Disabled"); }
	public static filterAlreadyDisabled(): APIEmbed { return this.template("Filter Already Disabled"); }
	public static filterReset(): APIEmbed { return this.template("Filter Reset"); }
	public static filterEmpty(): APIEmbed { return this.template("Filter Empty"); }
	public static filterAdded(item: string): APIEmbed { return this.template(`\`${item}\` Added`); }
	public static filterAlreadyAdded(item: string): APIEmbed { return this.template(`\`${item}\` Already Added`); }
	public static filterRemoved(item: string): APIEmbed { return this.template(`\`${item}\` Removed`); }
	public static filterAlreadyRemoved(item: string): APIEmbed { return this.template(`\`${item}\` Already Removed`); }
	public static filterPasted(): APIEmbed { return this.template("Filter Pasted"); }
	public static filterList(items: string[]): APIEmbed {
		let formatted: string = "";
		for (let i: number = 0; i < items.length - 1; i++) { formatted += `**\`${items[i]}\`**,\n`; }
		return this.template("Filter", formatted + `**\`${items[items.length - 1]}\`**`);
	}

	// ADVERTISEMENTS
	public static adEnabled(): APIEmbed { return this.template("Advertisement Enabled"); }
	public static adAlreadyEnabled(): APIEmbed { return this.template("Advertisement Already Enabled"); }
	public static adDisabled(): APIEmbed { return this.template("Advertisement Disabled"); }
	public static adAlreadyDisabled(): APIEmbed { return this.template("Advertisement Enabled"); }
	public static adsReset(): APIEmbed { return this.template("Advertisements Reset"); }
	public static adsEmpty(): APIEmbed { return this.template("Advertisements Empty"); }
	public static adNotFound(): APIEmbed { return this.template("Advertisement Not Found"); }
	public static adAdded(name: string): APIEmbed { return this.template(`\`${name}\` Advertisement Added`); }
	public static adAlreadyAdded(name: string): APIEmbed { return this.template(`\`${name}\` Advertisement Already Added`); }
	public static adRemoved(name: string): APIEmbed { return this.template(`\`${name}\` Advertisement Removed`); }
	public static adAlreadyRemoved(name: string): APIEmbed { return this.template(`\`${name}\` Advertisement Already Removed`); }
	public static adEdited(name: string): APIEmbed { return this.template(`\`${name}\` Advertisement Edited`); }
	public static adInfo(ad: Advertisement): APIEmbed { return this.template(ad.name, `**\`${ad.interval / 60_000}m + ...${ad.randomizer / 60_000}m\`**\n${ad.text}\n\n`); }
	public static adList(ads: Advertisement[]): APIEmbed {
		let formatted = "";
		for (const ad of ads) { formatted += `**__${ad.name}__**: ` + this.adInfo(ad).description; }
		return this.template("Advertisements", formatted);
	}
}