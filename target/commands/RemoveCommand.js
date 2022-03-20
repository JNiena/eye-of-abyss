"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
const discord_akairo_1 = require("discord-akairo");
class RemoveCommand extends discord_akairo_1.Command {
    constructor(minecraftBots) {
        super("remove", {
            "aliases": ["remove"],
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
            if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word)) {
                minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== args.word);
                minecraftBot.config.save();
                message.channel.send(`**Removed "${args.word}" from the whitelist.**`).then();
            }
            else
                message.channel.send("**That word isn't on the whitelist.**").then();
        }
    }
}
exports.RemoveCommand = RemoveCommand;
