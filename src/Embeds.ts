import { APIEmbed } from "discord.js";
import { Log, MinecraftBot } from "./MinecraftBot";
import { Advertisement } from "./commands/AdvertiseCommand";

export class Embeds {
	public static readonly green: number = 2817792;
	public static readonly red: number = 16711680;
	public static readonly neutral: number = 7803166;

	// TEMPLATE
	public static template(title: string, description: string = "", color: number = this.neutral) {
		return {
			"title": title,
			"description": description,
			"color": color,
			"thumbnail": { "url": `https://cravatar.eu/helmavatar/${MinecraftBot.username}/24.png` }
		};
	}

	// CONNECTION
	public static connected(username: string | undefined = undefined) {
		return this.template(username ? `\`${username}\` Connected` : "Connected");
	}
	public static alreadyConnected() { return this.template("Already Connected"); }
	public static disconnected(username: string | undefined = undefined, info: Log | undefined = undefined) {
		if (!info) { return this.template(username ? `\`${username}\` Disconnected` : "Disconnected"); }
		const embed: APIEmbed = this.template(`\`${MinecraftBot.username}\` ${info.type}`);
		embed.fields = [{ "name": "Reason", "value": info.message }];
		return embed;
	}
	public static alreadyDisconnected() { return this.template("Already Disconnected"); }

	// MISC
	public static death() { return this.template(`\`${MinecraftBot.username}\` Died`); }
	public static messageSent() { return this.template("Message Sent"); }
	public static exiting() { return this.template("Exiting"); }

	// AUTO-RECONNECT
	public static autoReconnectEnabled() { return this.template("Auto-Reconnect Enabled"); }
	public static autoReconnectDisabled() { return this.template("Auto-Reconnect Disabled"); }

	// STATUS
	public static online() { return this.template("Online"); }
	public static offline() { return this.template("Offline"); }

	// SERVER
	public static hostSet() { return this.template("Host Set"); }
	public static portSet() { return this.template("Port Set"); }
	public static versionSet() { return this.template("Version Set"); }

	// COMMAND
	public static commandExecuted() { return this.template("Command Executed"); }
	public static commandNotFound() { return this.template("Command Not Found"); }

	// VALIDATION
	public static invalidOption(option: string) { return this.template(`Invalid ${option}`); }
	public static invalidArguments() { return this.template("Invalid Arguments"); }

	// DROP
	public static inventoryDropped() { return this.template("Dropping Inventory"); }
	public static armorDropped() { return this.template("Dropping Armor"); }
	public static offhandDropped() { return this.template("Dropping Offhand"); }
	public static mainhandDropped() { return this.template("Dropping Mainhand"); }

	// ACTION
	public static actionStarted() { return this.template("Action Started"); }
	public static actionStopped() { return this.template("Action Stopped"); }

	// LOGGER
	public static loggerEnabled() { return this.template("Logger Enabled"); }
	public static loggerDisabled() { return this.template("Logger Disabled"); }
	public static loggerPath() { return this.template("Logger Path"); }

	// FILTER
	public static filterEnabled() { return this.template("Filter Enabled"); }
	public static filterAlreadyEnabled() { return this.template("Filter Already Enabled"); }
	public static filterDisabled() { return this.template("Filter Disabled"); }
	public static filterAlreadyDisabled() { return this.template("Filter Already Disabled"); }
	public static filterReset() { return this.template("Filter Reset"); }
	public static filterEmpty() { return this.template("Filter Empty"); }
	public static filterAdded(item: string) { return this.template(`\`${item}\` Added`); }
	public static filterAlreadyAdded(item: string) { return this.template(`\`${item}\` Already Added`); }
	public static filterRemoved(item: string) { return this.template(`\`${item}\` Removed`); }
	public static filterAlreadyRemoved(item: string) { return this.template(`\`${item}\` Already Removed`); }
	public static filterPasted() { return this.template("Filter Pasted"); }
	public static filterList(items: string[]) {
		let formatted: string = "";
		for (let i: number = 0; i < items.length - 1; i++) { formatted += `**\`${items[i]}\`**,\n`; }
		return this.template("Filter", formatted + `**\`${items[items.length - 1]}\`**`);
	}

	// ADVERTISEMENTS
	public static adEnabled() { return this.template("Advertisement Enabled"); }
	public static adAlreadyEnabled() { return this.template("Advertisement Already Enabled"); }
	public static adDisabled() { return this.template("Advertisement Disabled"); }
	public static adAlreadyDisabled() { return this.template("Advertisement Enabled"); }
	public static adsReset() { return this.template("Advertisements Reset"); }
	public static adsEmpty() { return this.template("Advertisements Empty"); }
	public static adNotFound() { return this.template("Advertisement Not Found"); }
	public static adAdded(name: string) { return this.template(`\`${name}\` Advertisement Added`); }
	public static adAlreadyAdded(name: string) { return this.template(`\`${name}\` Advertisement Already Added`); }
	public static adRemoved(name: string) { return this.template(`\`${name}\` Advertisement Removed`); }
	public static adAlreadyRemoved(name: string) { return this.template(`\`${name}\` Advertisement Already Removed`); }
	public static adEdited(name: string) { return this.template(`\`${name}\` Advertisement Edited`); }
	public static adInfo(ad: Advertisement) { return this.template(ad.name, `**\`${ad.interval / 60_000}m + ...${ad.randomizer / 60_000}m\`**\n${ad.text}\n\n`); }
	public static adList(ads: Advertisement[]) {
		let formatted = "";
		for (const ad of ads) { formatted += `**__${ad.name}__**: ` + this.adInfo(ad).description; }
		return this.template("Advertisements", formatted);
	}
}
/*


**`1m + ...1m`**\naaaa\n\n `**__aaa__**: `


*/