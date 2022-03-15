"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
const ChannelCommand_1 = require("../ChannelCommand");
class RemoveCommand extends ChannelCommand_1.ChannelCommand {
    constructor(channelID, discordBot, minecraftBot) {
        super(channelID, "!remove", (message) => {
            if (!minecraftBot.config.get()["whitelist"]["filter"].includes(message.content.toLowerCase())) {
                discordBot.send("**That word isn't on the whitelist.**", channelID).then();
                return;
            }
            minecraftBot.config.get()["whitelist"]["filter"] = minecraftBot.config.get()["whitelist"]["filter"].filter((element) => element !== message.content.toLowerCase());
            minecraftBot.config.save();
            discordBot.send("**Removed \"" + message.content + "\" from the whitelist.**", channelID).then();
        });
    }
}
exports.RemoveCommand = RemoveCommand;
