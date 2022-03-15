"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class StatusCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!status", (message) => {
            if (minecraftBot.isConnected()) {
                discordBot.send("**The bot is online.**", channelID).then();
            }
            else {
                discordBot.send("**The bot is offline.**", channelID).then();
            }
        });
    }
}
exports.StatusCommand = StatusCommand;
