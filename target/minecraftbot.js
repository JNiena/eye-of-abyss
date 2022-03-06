"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftBot = void 0;
const mineflayer_1 = require("mineflayer");
class MinecraftBot {
    constructor(email, password, host, port = 25565) {
        this.email = email;
        this.password = password;
        this.host = host;
        this.port = port;
        this.bot = (0, mineflayer_1.createBot)({
            username: email,
            password: password,
            host: host,
            port: port
        });
    }
    onSpawn(callback = () => { }) {
        this.bot.on("spawn", () => {
            callback();
        });
    }
    onFirstSpawn(callback = () => { }) {
        this.bot.once("spawn", () => {
            callback();
        });
    }
    onMessage(callback = () => { }) {
        this.bot.on("message", message => {
            callback(message);
        });
    }
    onKicked(callback = () => { }) {
        this.bot.on("kicked", () => {
            callback();
        });
    }
}
exports.MinecraftBot = MinecraftBot;
