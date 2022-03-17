"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class DisableCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("disable", {
            "aliases": ["disable"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            minecraftBot.config.get()["whitelist"]["enabled"] = false;
            minecraftBot.config.save();
            message.reply("**Whitelist disabled.**").then();
        });
    }
}
exports.DisableCommand = DisableCommand;
