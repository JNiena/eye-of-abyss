"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.MinecraftBot = void 0;
const mineflayer_1 = require("mineflayer");

class MinecraftBot {
	constructor(config) {
		this.config = config;
		this.connect();
	}

	connect() {
		this.bot = (0, mineflayer_1.createBot)({
			username: this.config.get()["bot"]["email"],
			password: this.config.get()["bot"]["password"],
			host: this.config.get()["bot"]["host"],
			port: this.config.get()["bot"]["port"],
			auth: this.config.get()["bot"]["auth"]
		});
	}

	isConnected() {
		return false;
	}

	disconnect() {
		this.bot.quit();
	}

	chat(message) {
		if (message.length === 0) {
			return;
		}
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