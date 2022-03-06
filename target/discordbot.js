"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
class DiscordBot {
    constructor(token) {
        this.token = token;
        this.client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
    }
    login(callback = () => { }) {
        this.client.login(this.token).then(() => {
            callback();
        });
    }
    onMessage(callback) {
        this.client.on("message", (message) => {
            callback(message);
        });
    }
    onReady(callback) {
        this.client.on("ready", () => {
            callback();
        });
    }
}
exports.DiscordBot = DiscordBot;
