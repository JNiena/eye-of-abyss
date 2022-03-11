"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ChannelCommand = void 0;
const command_1 = require("./command");

class ChannelCommand extends command_1.Command {
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