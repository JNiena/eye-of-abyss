"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftBot = void 0;
const mineflayer_1 = require("mineflayer");
class MinecraftBot {
    constructor(config) {
        this.config = config;
        this.reconnecting = false;
        this.connected = false;
    }
    connect() {
        this.bot = (0, mineflayer_1.createBot)({
            username: this.config.get()["bot"]["email"],
            password: this.config.get()["bot"]["password"],
            host: this.config.get()["bot"]["host"],
            port: this.config.get()["bot"]["port"],
            auth: this.config.get()["bot"]["auth"]
        });
        this.bot.on("login", () => {
            this.connected = true;
        });
        this.bot.on("end", () => {
            this.connected = false;
        });
    }
    reconnect(handler) {
        this.reconnecting = true;
        setTimeout(() => {
            this.connect();
            handler();
            this.reconnecting = false;
        }, this.config.get()["autoRejoin"]["delay"]);
    }
    isConnected() {
        return this.connected;
    }
    isReconnecting() {
        return this.reconnecting;
    }
    disconnect() {
        this.bot.quit();
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
        this.bot.on("kicked", (reason) => {
            callback(reason);
        });
    }
    onError(callback) {
        this.bot.on("error", (error) => {
            callback(error);
        });
    }
}
exports.MinecraftBot = MinecraftBot;
