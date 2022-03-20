"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorListener = void 0;
class ErrorListener {
    constructor(channelID, discordBot, minecraftBot, setupBehavior) {
        this.handle = (error) => {
            discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has encountered an error! Reason: ${error.message}**`, channelID).then();
            if (minecraftBot.config.get()["autoRejoin"]["enabled"]) {
                discordBot.send(`**Attempting to reconnect in ${minecraftBot.config.get()["autoRejoin"]["delay"] / 1000} seconds...**`, channelID).then();
                minecraftBot.reconnect();
            }
        };
    }
}
exports.ErrorListener = ErrorListener;
