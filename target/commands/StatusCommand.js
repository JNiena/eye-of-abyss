"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCommand = void 0;
const Command_1 = require("../Command");
class StatusCommand extends Command_1.Command {
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
