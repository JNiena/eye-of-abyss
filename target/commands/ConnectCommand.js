"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class ConnectCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("connect", {
            "aliases": ["connect"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            if (minecraftBot.isReconnecting()) {
                message.reply("**The bot is already attempting to reconnect, please wait.**").then();
            }
            else if (minecraftBot.isConnected()) {
                message.reply("**The bot is already connected.**").then();
            }
            else {
                minecraftBot.connect();
            }
        });
    }
}
exports.ConnectCommand = ConnectCommand;
