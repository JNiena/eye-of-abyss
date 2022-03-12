"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatListener = void 0;
const whitelist_1 = require("../whitelist");
const files_1 = require("../files");
class ChatListener {
    constructor(channelID, discordBot, minecraftBot) {
        this.handle = (username, message) => {
            let toSend = username + " » " + message.replace("@", "");
            if (!minecraftBot.config.get()["whitelist"]["enabled"] || new whitelist_1.Whitelist(minecraftBot.config.get()["whitelist"]["filter"]).processText(toSend)) {
                discordBot.send(toSend, channelID).then();
            }
            if (minecraftBot.config.get()["log"]["enabled"]) {
                files_1.Files.write(minecraftBot.config.get()["log"]["path"], toSend + "\n");
            }
        };
    }
}
exports.ChatListener = ChatListener;
