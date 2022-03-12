"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableCommand = void 0;
const channelCommand_1 = require("../channelCommand");
class EnableCommand extends channelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!enable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = true;
            minecraftBot.config.save();
            discordBot.send("**Whitelist enabled.**", channelID).then();
        });
    }
}
exports.EnableCommand = EnableCommand;
