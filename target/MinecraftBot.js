"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftBot = void 0;
const mineflayer_1 = require("mineflayer");
class MinecraftBot {
    constructor(config, initializeFunction = () => { }) {
        this.config = config;
        this.reconnecting = false;
        this.connected = false;
        this.initializeFunction = initializeFunction;
        if (config.get()["enabled"])
            this.connect();
    }
    connect() {
        this.bot = (0, mineflayer_1.createBot)({
            username: this.config.get()["bot"]["email"],
            password: this.config.get()["bot"]["password"],
            host: this.config.get()["bot"]["host"],
            port: this.config.get()["bot"]["port"],
            version: this.config.get()["bot"]["version"],
            auth: this.config.get()["bot"]["auth"]
        });
        this.bot.on("login", () => {
            this.connected = true;
        });
        this.bot.on("end", () => {
            this.connected = false;
        });
        this.initializeFunction(this);
    }
    reconnect(handler) {
        this.reconnecting = true;
        setTimeout(() => {
            this.connect();
            handler();
            this.reconnecting = false;
        }, this.config.get()["autoRejoin"]["delay"]);
    }
    disconnect() {
        this.bot.quit();
    }
    chat(message) {
        if (message.length === 0)
            return;
        this.bot.chat(message);
    }
    on(event, listener) {
        this.bot.on(event, listener.handle);
    }
    once(event, listener) {
        this.bot.once(event, listener.handle);
    }
    isConnected() {
        return this.connected;
    }
    isReconnecting() {
        return this.reconnecting;
    }
}
exports.MinecraftBot = MinecraftBot;
