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
        for (let i = 0; i < this.minecraftBots.length; i++) {
            let minecraftBot = this.minecraftBots[i];
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                continue;
            minecraftBot.config.get()["whitelist"]["filter"] = [];
            minecraftBot.config.save();
            message.channel.send("**The whitelist has been reset.**").then();
        }
    }
}
exports.ResetCommand = ResetCommand;
