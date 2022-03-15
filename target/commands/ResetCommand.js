"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class ResetCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!reset", (message) => {
            minecraftBot.config.get()["whitelist"]["filter"] = [];
            minecraftBot.config.save();
            discordBot.send("**The whitelist has been reset.**", channelID).then();
        });
    }
}
exports.ResetCommand = ResetCommand;
