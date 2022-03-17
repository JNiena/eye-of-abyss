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
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            if (minecraftBot.isConnected()) {
                message.reply("**The bot is online.**").then();
            }
            else {
                message.reply("**The bot is offline.**").then();
            }
        });
    }
}
exports.StatusCommand = StatusCommand;
