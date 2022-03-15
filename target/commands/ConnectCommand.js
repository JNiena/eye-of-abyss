"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class ConnectCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot, setupBehavior) {
        super(channelID, "!connect", (message) => {
            if (minecraftBot.isReconnecting()) {
                discordBot.send("**The bot is already attempting to reconnect, please wait.**", channelID).then();
                return;
            }
            if (minecraftBot.isConnected()) {
                discordBot.send("**The bot is already connected.**", channelID).then();
                return;
            }
            minecraftBot.connect();
            setupBehavior(minecraftBot);
        });
    }
}
exports.ConnectCommand = ConnectCommand;
