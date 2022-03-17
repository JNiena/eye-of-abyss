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
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word)) {
                message.reply("**That word is already on the whitelist.**").then();
            }
            else {
                minecraftBot.config.get()["whitelist"]["filter"].push(args.word);
                minecraftBot.config.save();
                message.reply(`**Added "${args.word}" to the whitelist.**`).then();
            }
        });
    }
}
exports.AddCommand = AddCommand;
