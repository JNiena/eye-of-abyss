"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(channelID, name, handler) {
        this.channelID = channelID;
        this.name = name;
        this.handler = handler;
    }
    handle(message) {
        message.content = message.content.replace(this.name, "");
        this.handler(message);
        message.content = `${this.name}${message.content}`;
    }
}
exports.Command = Command;
