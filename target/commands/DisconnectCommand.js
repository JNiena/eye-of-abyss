"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisconnectCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class DisconnectCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!disconnect", (message) => {
            if (!minecraftBot.isConnected()) {
                discordBot.send("**The bot is already disconnected.**", channelID).then();
                return;
            }
            minecraftBot.disconnect();
            discordBot.send("**Successfully disconnected.**", channelID).then();
        });
    }
}
exports.DisconnectCommand = DisconnectCommand;
