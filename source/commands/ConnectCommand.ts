import {Command} from "@sapphire/framework";
import {ChatInputCommandInteraction, Message} from "discord.js";
import {ChannelCommand} from "../ChannelCommand";
import {Embeds} from "../Embeds";
import {minecraftBot} from "../Main";
import {LoginListener} from "../minecraft/LoginListener";

export class ConnectCommand extends ChannelCommand {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            "name": "connect",
            "description": "Connects the bot to the server."
        });
    }

    public override registerApplicationCommands(registry: Command.Registry): void {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName(this.name)
                .setDescription(this.description);
        }, {"idHints": ["1094053790623215729"]});
    }

    public override async run(interaction: ChatInputCommandInteraction): Promise<Message> {
        await interaction.deferReply();
        if (minecraftBot.isConnected()) {
            return interaction.editReply({"embeds": [Embeds.alreadyConnected()]});
        }
        LoginListener.lastInteraction = interaction;
        minecraftBot.connect(1_000);
        return interaction.editReply({"embeds": [Embeds.attemptingConnect()]});
    }
}