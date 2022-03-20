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
        for (let i = 0; i < this.minecraftBots.length; i++) {
            let minecraftBot = this.minecraftBots[i];
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                continue;
            minecraftBot.config.get()["whitelist"]["enabled"] = true;
            minecraftBot.config.save();
            message.channel.send("**Whitelist enabled.**").then();
        }
    }
}
exports.EnableCommand = EnableCommand;
