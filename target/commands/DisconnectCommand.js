"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisconnectCommand = void 0;
const Command_1 = require("../Command");
class DisconnectCommand extends Command_1.Command {
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
