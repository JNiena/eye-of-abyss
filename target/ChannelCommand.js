"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCommand = void 0;
const Command_1 = require("./Command");
class ChannelCommand extends Command_1.Command {
    constructor(channelID, name, handler) {
        super(name, handler);
        this.channelID = channelID;
    }
    handle(message) {
        if (message.channel.id === this.channelID) {
            super.handle(message);
        }
    }
}
exports.ChannelCommand = ChannelCommand;
