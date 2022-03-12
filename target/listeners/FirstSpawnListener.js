"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstSpawnListener = void 0;
class FirstSpawnListener {
    constructor(channelID, discordBot, minecraftBot) {
        this.handle = () => {
            minecraftBot.chat(minecraftBot.config.get()["joinMessage"]);
            discordBot.send("**Successfully connected.**", channelID).then();
        };
    }
}
exports.FirstSpawnListener = FirstSpawnListener;
