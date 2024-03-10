import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { Embeds } from "../Embeds";
import { discordBot, minecraftBot } from "../Main";
import { ControlState } from "mineflayer";

export class ActionCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "action",
			"description": "Does an action.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override async messageRun(_message: Message<boolean>, args: Args) {
		if (!minecraftBot.connected) { return discordBot.sendEmbed(Embeds.offline()); }
		const direction: string = await args.pick("string");
		if (direction === "stop") {
			minecraftBot.internal.clearControlStates();
			return discordBot.sendEmbed(Embeds.actionStopped());
		}
		const time: number = await args.pick("number").catch(() => 1);
		minecraftBot.internal.setControlState(direction as ControlState, true);
		setTimeout(() => { minecraftBot.internal.setControlState(direction as ControlState, false); }, time * 1000);
		return discordBot.sendEmbed(Embeds.actionStarted());
	}
}