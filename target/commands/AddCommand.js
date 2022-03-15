"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const Command_1 = require("../Command");
class AddCommand extends Command_1.Command {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!add", (message) => {
            if (minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
                discordBot.send("**That word is already on the whitelist.**", channelID).then();
                return;
            }
            minecraftBot.config.get()["whitelist"]["filter"].push(message.content.toLowerCase());
            minecraftBot.config.save();
            discordBot.send("**Added \"" + message.content + "\" to the whitelist.**", channelID).then();
        });
    }
}
exports.AddCommand = AddCommand;
