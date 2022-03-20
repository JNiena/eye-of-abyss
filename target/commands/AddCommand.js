"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class AddCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("add", {
            "aliases": ["add"],
            "args": [
                {
                    "id": "word",
                    "type": "lowercase"
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
            if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word))
                message.channel.send("**That word is already on the whitelist.**").then();
            else {
                minecraftBot.config.get()["whitelist"]["filter"].push(args.word);
                minecraftBot.config.save();
                message.channel.send(`**Added "${args.word}" to the whitelist.**`).then();
            }
        }
    }
}
exports.AddCommand = AddCommand;
