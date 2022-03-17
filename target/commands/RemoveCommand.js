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
        this.minecraftBots.forEach(minecraftBot => {
            if (message.channel.id !== minecraftBot.config.get()["discord"]["channelID"])
                return;
            if (minecraftBot.config.get()["whitelist"]["filter"].includes(args.word)) {
                minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== args.word);
                minecraftBot.config.save();
                message.reply(`**Removed "${args.word}" from the whitelist.**`).then();
            }
            else {
                message.reply("**That word isn't on the whitelist.**").then();
            }
        });
    }
}
exports.RemoveCommand = RemoveCommand;
