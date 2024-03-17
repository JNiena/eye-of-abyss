import { Command } from "@sapphire/framework";
import { Embeds } from "../Embeds";
import { exit } from "process";

export class ExitCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
			"name": "exit",
			"description": "Exits the program after ten seconds.",
			"preconditions": ["ValidChannel"]
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => {
			builder.setName(this.name).setDescription(this.description);
		}/*, { "idHints": [""] }*/);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		setTimeout(() => exit(), 10_000);
		return interaction.reply({ "embeds": [Embeds.exiting()] });
	}
}