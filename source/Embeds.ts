import { Timestamp } from "@sapphire/time-utilities";
import { APIEmbed } from "discord.js";
import { minecraftBot } from "./Main";

export class Embeds {
	public static readonly green: number = 2817792;
	public static readonly red: number = 16711680;
	public static readonly neutral: number = 7803166;

	public static template(title: string, description: string, color: number): APIEmbed {
		return {
			"title": title,
			"description": description,
			"color": color,
			"footer": {
				"text": new Timestamp("MM-DD-YYYY HH:mm:ss").displayUTC()
			},
			"thumbnail": {
				"url": `https://api.mineatar.io/face/${minecraftBot.internal().username}?scale=5`
			}
		};
	}

	public static connected(): APIEmbed {
		return this.template("Connected", "The bot has connected!", this.neutral);
	}

	public static alreadyConnected(): APIEmbed {
		return this.template("Already Connected", "The bot is already connected!", this.neutral);
	}

	public static disconnected(): APIEmbed {
		return this.template("Disconnected", "The bot has disconnected!", this.neutral);
	}

	public static alreadyDisconnected(): APIEmbed {
		return this.template("Already Disconnected", "The bot is already disconnected!", this.neutral);
	}

	public static reconnected(): APIEmbed {
		return this.template("Reconnected", "The bot has reconnected!", this.neutral);
	}

	public static reconnecting(delay: number): APIEmbed {
		return this.template("Reconnecting", `The bot is reconnecting in ${delay / 1000}s!`, this.neutral);
	}

	public static online(): APIEmbed {
		return this.template("Online", "The bot is online!", this.neutral);
	}

	public static offline(): APIEmbed {
		return this.template("Offline", "The bot is offline!", this.neutral);
	}

	public static messageSent(message: string): APIEmbed {
		return this.template("Message Sent", message, this.neutral);
	}

	public static itemsDropped(): APIEmbed {
		return this.template("Items Dropped", "The bot has dropped its items!", this.neutral);
	}

	public static respawning(delay: number): APIEmbed {
		return this.template("Respawning", `The bot is respawning in ${delay / 1000}s!`, this.neutral);
	}

	public static death(): APIEmbed {
		return this.template("Death", "The bot has died!", this.neutral);
	}

	public static kicked(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Kicked", "The bot has been kicked!", this.neutral);
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static error(reason: string): APIEmbed {
		const embed: APIEmbed = this.template("Error", "The bot has encountered an error!", this.neutral);
		embed.fields = [
			{
				"name": "Reason",
				"value": reason
			}
		];
		return embed;
	}

	public static filterList(items: string[]): APIEmbed {
		return this.template("Filter", items.toString(), this.neutral);
	}

	public static filterEmpty(): APIEmbed {
		return this.template("Filter Empty", "The filter is empty!", this.neutral);
	}

	public static filterEnable(): APIEmbed {
		return this.template("Filter Enabled", "The filter has been enabled!", this.neutral);
	}

	public static filterDisable(): APIEmbed {
		return this.template("Filter Disabled", "The filter has been disabled!", this.neutral);
	}

	public static filterReset(): APIEmbed {
		return this.template("Filter Reset", "The filter has been reset!", this.neutral);
	}

	public static filterAdded(item: string): APIEmbed {
		return this.template("Item Added", `__${item}__ was added to the filter!`, this.neutral);
	}

	public static filterAlreadyAdded(item: string): APIEmbed {
		return this.template("Item Already Added", `__${item}__ is already added to the filter!`, this.neutral);
	}

	public static filterRemoved(item: string): APIEmbed {
		return this.template("Item Removed", `__${item}__ was removed from the filter!`, this.neutral);
	}

	public static filterAlreadyRemoved(item: string): APIEmbed {
		return this.template("Item Already Removed", `__${item}__ is already removed from the filter!`, this.neutral);
	}
}