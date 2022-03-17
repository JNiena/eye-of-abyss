"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class ListCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("list", {
            "aliases": ["list"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            message.reply(`**Whitelist: ${minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ")}.**`).then();
        });
    }
}
exports.ListCommand = ListCommand;
