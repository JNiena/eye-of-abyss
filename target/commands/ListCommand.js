"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class ListCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!list", (message) => {
            discordBot.send("**Whitelist: " + minecraftBot.config.get()["whitelist"]["filter"].toString().replace(" ", ", ") + "**", channelID).then();
        });
    }
}
exports.ListCommand = ListCommand;
