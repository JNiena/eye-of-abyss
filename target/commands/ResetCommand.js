"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class ResetCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("reset", {
            "aliases": ["reset"]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            minecraftBot.config.get()["whitelist"]["filter"] = [];
            minecraftBot.config.save();
            message.reply("**The whitelist has been reset.**").then();
        });
    }
}
exports.ResetCommand = ResetCommand;
