"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisconnectCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class DisconnectCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("disconnect", {
            "aliases": ["disconnect"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        for (let i = 0; i < this.minecraftBots.length; i++) {
            let minecraftBot = this.minecraftBots[i];
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                continue;
            if (minecraftBot.isConnected()) {
                minecraftBot.disconnect();
                message.channel.send("**Successfully disconnected.**").then();
            }
            else
                message.channel.send("**The bot is already disconnected.**").then();
        }
    }
}
exports.DisconnectCommand = DisconnectCommand;
