"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableCommand = void 0;
const channelCommand_1 = require("../channelCommand");
class DisableCommand extends channelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!disable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = false;
            minecraftBot.config.save();
            discordBot.send("**Whitelist disabled.**", channelID).then();
        });
    }
}
exports.DisableCommand = DisableCommand;
