"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftBot = void 0;
const mineflayer_1 = require("mineflayer");
class MinecraftBot {
    constructor(config) {
        this.config = config;
        this.bot = (0, mineflayer_1.createBot)({
            username: config.get()["bot"]["email"],
            password: config.get()["bot"]["password"],
            host: config.get()["bot"]["host"],
            port: config.get()["bot"]["port"],
            auth: config.get()["bot"]["auth"]
        });
    }
    chat(message) {
        if (message.length === 0)
            return;
        this.bot.chat(message);
    }
    onSpawn(callback) {
        this.bot.on("spawn", () => {
            callback();
        });
    }
    onFirstSpawn(callback) {
        this.bot.once("spawn", () => {
            callback();
        });
    }
    onChat(callback) {
        this.bot.on("chat", (username, message) => {
            callback(username, message);
        });
    }
    onKicked(callback) {
        this.bot.on("kicked", () => {
            callback();
        });
    }
}
exports.MinecraftBot = MinecraftBot;
