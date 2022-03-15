"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class EnableCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!enable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = true;
            minecraftBot.config.save();
            discordBot.send("**Whitelist enabled.**", channelID).then();
        });
    }
}
exports.EnableCommand = EnableCommand;
