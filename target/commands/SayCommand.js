"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayCommand = void 0;
const Command_1 = require("../Command");
class SayCommand extends Command_1.Command {
    constructor(channelID, minecraftBot) {
        super(channelID, "!say", (message) => {
            minecraftBot.chat(message.toString());
        });
    }
}
exports.SayCommand = SayCommand;
