import { DiscordBot } from "./DiscordBot";
import { MinecraftBot } from "./MinecraftBot";

export abstract class Plugin {

    public abstract name: string;
    public abstract version: string;

    protected minecraftBot: MinecraftBot;
    protected discordBot: DiscordBot;

    public constructor(minecraftBot: MinecraftBot, discordBot: DiscordBot) {
        this.minecraftBot = minecraftBot;
        this.discordBot = discordBot;
    }

    public abstract start(): void;
    public abstract stop(): void;

}