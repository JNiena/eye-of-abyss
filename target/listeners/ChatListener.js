"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatListener = void 0;
const Whitelist_1 = require("../Whitelist");
const Files_1 = require("../Files");
class ChatListener {
    constructor(channelID, discordBot, minecraftBot) {
        this.handle = (username, message) => {
            let toSend = username + " » " + message.replace("@", "");
            if (minecraftBot.config.get()["log"]["enabled"]) {
                Files_1.Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
            }
            if (!minecraftBot.config.get()["whitelist"]["enabled"] || new Whitelist_1.Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
                discordBot.send(toSend, channelID).then();
            }
        };
    }
}
exports.ChatListener = ChatListener;
