"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class DisableCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!disable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = false;
            minecraftBot.config.save();
            discordBot.send("**Whitelist disabled.**", channelID).then();
        });
    }
}
exports.DisableCommand = DisableCommand;
