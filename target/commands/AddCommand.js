"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const channelCommand_1 = require("../channelCommand");
class AddCommand extends channelCommand_1.ChannelCommand {
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
