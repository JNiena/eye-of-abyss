import { APIEmbed } from "discord.js";
import { minecraftBot } from "./Main";

export class Embeds {
	public static readonly green: number = 2817792;
	public static readonly red: number = 16711680;
	public static readonly neutral: number = 7803166;

	public static template(title: string, description: string = "", color: number = this.neutral): APIEmbed {
		return {
			"title": title,
			"description": description,
			"color": color,
			"thumbnail": {
				"url": `https://cravatar.eu/helmavatar/${minecraftBot.internal().username}/24.png`
			}
		};
	}

	public static connected(): APIEmbed {
		return this.template("Connected");
	}

	public static alreadyConnected(): APIEmbed {
		return this.template("Already Connected");
	}

	public static attemptingConnect(delay: number = 0): APIEmbed {
		const title: string = delay == 0
			? "Attempting Connect"
			: `Attempting Connect [\`${delay / 1000}s\`]!`;
		return this.template(title);
	}

	public static disconnected(): APIEmbed {
		return this.template("Disconnected");
	}

	public static alreadyDisconnected(): APIEmbed {
		return this.template("Already Disconnected");
	}

	public static attemptingDisconnect(delay: number = 0): APIEmbed {
		const title: string = delay == 0
			? "Attempting Disconnect"
			: `Attempting Disconnect [\`${delay / 1000}s\`]!`;
		return this.template(title);
	}

	public static reconnected(): APIEmbed {
		return this.template("Reconnected");
	}

	public static attemptingReconnect(delay: number = 0): APIEmbed {
		const title: string = delay == 0
			? "Attempting Reconnect"
			: `Attempting Reconnect [\`${delay / 1000}s\`]`;
		return this.template(title);
	}

	public static online(): APIEmbed {
		return this.template("Online");
	}

	public static offline(): APIEmbed {
		return this.template("Offline");
	}

	public static messageSent(): APIEmbed {
		return this.template("Message Sent");
	}

	public static commandExecuted(): APIEmbed {
		return this.template("Command Executed");
	}

	public static invalidOption(): APIEmbed {
		return this.template("Invalid Option");
	}

	public static inventoryDropped(): APIEmbed {
		return this.template("Inventory Dropped");
	}

	public static armorDropped(): APIEmbed {
		return this.template("Armor Dropped");
	}

	public static offhandDropped(): APIEmbed {
		return this.template("Offhand Dropped");
	}

	public static mainhandDropped(): APIEmbed {
		return this.template("Mainhand Dropped");
	}

	public static respawning(delay: number): APIEmbed {
		return this.template(`Respawning [\`${delay / 1000}s\`]`);
	}

	public static death(): APIEmbed {
		return this.template("Death");
	}

	public static kicked(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Kicked");
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static error(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Error");
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static filterList(items: string[]): APIEmbed {
		let formatted: string = "";
		for (let i: number = 0; i < items.length - 1; i++) {
			formatted += `\`${items[i]}\`,\n`;
		}
		formatted += `\`${items[items.length - 1]}\``;
		return this.template("Filter", formatted);
	}

	public static filterEmpty(): APIEmbed {
		return this.template("Filter Empty");
	}

	public static filterEnable(): APIEmbed {
		return this.template("Filter Enabled");
	}

	public static filterDisable(): APIEmbed {
		return this.template("Filter Disabled");
	}

	public static filterReset(): APIEmbed {
		return this.template("Filter Reset");
	}

	public static filterAdded(item: string): APIEmbed {
		return this.template(`[\`${item}\`] Added`);
	}

	public static filterAlreadyAdded(item: string): APIEmbed {
		return this.template(`[\`${item}\`] Already Added`);
	}

	public static filterRemoved(item: string): APIEmbed {
		return this.template(`[\`${item}\`] Removed`);
	}

	public static filterAlreadyRemoved(item: string): APIEmbed {
		return this.template(`[\`${item}\`] Already Removed`);
	}

	public static filterPasted(): APIEmbed {
		return this.template("Filter Pasted");
	}

	public static autoReconnectEnabled(): APIEmbed {
		return this.template("Auto-Reconnect Enabled");
	}

	public static autoReconnectDisabled(): APIEmbed {
		return this.template("Auto-Reconnect Disabled");
	}
}