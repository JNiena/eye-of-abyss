"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class SayCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("say", {
            "aliases": ["say"],
            "args": [
                {
                    "id": "message",
                    "type": "string"
                }
            ]
        });
        this.minecraftBots = minecraftBots;
    }
    exec(message, args) {
        for (let i = 0; i < this.minecraftBots.length; i++) {
            let minecraftBot = this.minecraftBots[i];
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                continue;
            minecraftBot.chat(args.message);
        }
    }
}
exports.SayCommand = SayCommand;
