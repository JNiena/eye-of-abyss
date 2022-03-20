"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class StatusCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("status", {
            "aliases": ["status"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        for (let i = 0; i < this.minecraftBots.length; i++) {
            let minecraftBot = this.minecraftBots[i];
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                continue;
            if (minecraftBot.isConnected())
                message.channel.send("**The bot is online.**").then();
            else
                message.channel.send("**The bot is offline.**").then();
        }
    }
}
exports.StatusCommand = StatusCommand;
