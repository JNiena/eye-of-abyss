"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class EnableCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("enable", {
            "aliases": ["enable"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            minecraftBot.config.get()["whitelist"]["enabled"] = true;
            minecraftBot.config.save();
            message.reply("**Whitelist enabled.**").then();
        });
    }
}
exports.EnableCommand = EnableCommand;
