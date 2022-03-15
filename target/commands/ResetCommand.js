"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetCommand = void 0;
const Command_1 = require("../Command");
class ResetCommand extends Command_1.Command {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!reset", (message) => {
            minecraftBot.config.get()["whitelist"]["filter"] = [];
            minecraftBot.config.save();
            discordBot.send("**The whitelist has been reset.**", channelID).then();
        });
    }
}
exports.ResetCommand = ResetCommand;
