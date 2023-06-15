import { Timestamp } from "@sapphire/time-utilities";
import { APIEmbed } from "discord.js";
import { minecraftBot } from "./Main";

export class Embeds {
	public static readonly green: number = 2817792;
	public static readonly red: number = 16711680;
	public static readonly neutral: number = 7803166;

	public static template(title: string, description: string, color: number = this.neutral): APIEmbed {
		return {
			"title": title,
			"description": description,
			"color": color,
			"footer": {
				"text": new Timestamp("MM-DD-YYYY HH:mm:ss").display()
			},
			"thumbnail": {
				"url": `https://cravatar.eu/helmavatar/${minecraftBot.internal().username}/64.png`
			}
		};
	}

	public static connected(): APIEmbed {
		return this.template("Connected", "The bot has connected!");
	}

	public static alreadyConnected(): APIEmbed {
		return this.template("Already Connected", "The bot is already connected!");
	}

	public static disconnected(): APIEmbed {
		return this.template("Disconnected", "The bot has disconnected!");
	}

	public static alreadyDisconnected(): APIEmbed {
		return this.template("Already Disconnected", "The bot is already disconnected!");
	}

	public static reconnected(): APIEmbed {
		return this.template("Reconnected", "The bot has reconnected!");
	}

	public static reconnecting(delay: number): APIEmbed {
		return this.template("Reconnecting", `The bot is reconnecting in \`${delay / 1000}s\`!`);
	}

	public static online(): APIEmbed {
		return this.template("Online", "The bot is online!");
	}

	public static offline(): APIEmbed {
		return this.template("Offline", "The bot is offline!");
	}

	public static messageSent(): APIEmbed {
		return this.template("Message Sent", "The message has been sent!");
	}

	public static itemsDropped(): APIEmbed {
		return this.template("Items Dropped", "The bot has dropped its items!");
	}

	public static respawning(delay: number): APIEmbed {
		return this.template("Respawning", `The bot is respawning in \`${delay / 1000}s\`!`);
	}

	public static death(): APIEmbed {
		return this.template("Death", "The bot has died!");
	}

	public static kicked(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Kicked", "The bot has been kicked!");
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static error(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Error", "The bot has encountered an error!");
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static filterList(items: string[]): APIEmbed {
		return this.template("Filter", items.toString());
	}

	public static filterEmpty(): APIEmbed {
		return this.template("Filter Empty", "The filter is empty!");
	}

	public static filterEnable(): APIEmbed {
		return this.template("Filter Enabled", "The filter has been enabled!");
	}

	public static filterDisable(): APIEmbed {
		return this.template("Filter Disabled", "The filter has been disabled!");
	}

	public static filterReset(): APIEmbed {
		return this.template("Filter Reset", "The filter has been reset!");
	}

	public static filterAdded(item: string): APIEmbed {
		return this.template("Item Added", `\`${item}\` was added to the filter!`);
	}

	public static filterAlreadyAdded(item: string): APIEmbed {
		return this.template("Item Already Added", `\`${item}\` is already added to the filter!`);
	}

	public static filterRemoved(item: string): APIEmbed {
		return this.template("Item Removed", `\`${item}\` was removed from the filter!`);
	}

	public static filterAlreadyRemoved(item: string): APIEmbed {
		return this.template("Item Already Removed", `\`${item}\` is already removed from the filter!`);
	}
}