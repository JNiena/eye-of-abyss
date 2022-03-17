"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_akairo_1 = require("discord-akairo");
class DiscordBot extends discord_akairo_1.AkairoClient {
    constructor(config) {
        super();
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            "directory": config.get()["commands"]["path"],
            "prefix": config.get()["commands"]["prefix"]
        });
        this.commandHandler.loadAll();
        this.token = config.get()["token"];
    }
    connect(callback = () => { }) {
        if (this.token) {
            this.login(this.token).then(() => {
                callback();
            });
        }
    }
    registerCommand(command) {
        this.commandHandler.register(command);
    }
    send(text, channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (text.length === 0)
                return Promise.resolve();
            try {
                let channel = this.channels.cache.get(channelID);
                if (channel)
                    yield channel.send(text);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.DiscordBot = DiscordBot;
