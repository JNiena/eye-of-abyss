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
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            if (minecraftBot.isConnected()) {
                minecraftBot.disconnect();
                message.reply("**Successfully disconnected.**").then();
            }
            else {
                message.reply("**The bot is already disconnected.**").then();
            }
        });
    }
}
exports.DisconnectCommand = DisconnectCommand;
