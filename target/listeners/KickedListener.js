"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickedListener = void 0;
class KickedListener {
    constructor(channelID, discordBot, minecraftBot, setupBehavior) {
        this.handle = (reason) => {
            discordBot.send(`<@&${minecraftBot.config.get()["discord"]["pingRoleID"]}> **The bot has disconnected! Reason: ${JSON.parse(reason)["text"]}**`, channelID).then();
            if (minecraftBot.config.get()["autoRejoin"]["enabled"]) {
                discordBot.send(`**Attempting to reconnect in ${minecraftBot.config.get()["autoRejoin"]["delay"] / 1000} seconds...**`, channelID).then();
                minecraftBot.reconnect(() => {
                    setupBehavior(minecraftBot);
                });
            }
        };
    }
}
exports.KickedListener = KickedListener;
