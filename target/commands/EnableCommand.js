"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableCommand = void 0;
const Command_1 = require("../Command");
class EnableCommand extends Command_1.Command {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!enable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = true;
            minecraftBot.config.save();
            discordBot.send("**Whitelist enabled.**", channelID).then();
        });
    }
}
exports.EnableCommand = EnableCommand;
