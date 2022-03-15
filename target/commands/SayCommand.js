"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class SayCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, minecraftBot) {
        super(channelID, "!say", (message) => {
            minecraftBot.chat(message.toString());
        });
    }
}
exports.SayCommand = SayCommand;
