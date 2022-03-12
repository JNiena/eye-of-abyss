"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayCommand = void 0;
const channelCommand_1 = require("../channelCommand");
class SayCommand extends channelCommand_1.ChannelCommand {
    constructor(channelID, minecraftBot) {
        super(channelID, "!say", (message) => {
            minecraftBot.chat(message.toString());
        });
    }
}
exports.SayCommand = SayCommand;
