"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisableCommand = void 0;
const Command_1 = require("../Command");
class DisableCommand extends Command_1.Command {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!disable", (message) => {
            minecraftBot.config.get()["whitelist"]["enabled"] = false;
            minecraftBot.config.save();
            discordBot.send("**Whitelist disabled.**", channelID).then();
        });
    }
}
exports.DisableCommand = DisableCommand;
