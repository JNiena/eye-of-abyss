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
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            minecraftBot.chat(args.message);
        });
    }
}
exports.SayCommand = SayCommand;
