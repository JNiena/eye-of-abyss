"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}

	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}

		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}

		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}

		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");

class DiscordBot {
	constructor(config) {
		this.config = config;
		this.client = new discord_js_1.Client({intents: [discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILDS]});
		this.commands = [];
	}

	startListening() {
		this.client.on("messageCreate", (message) => {
			if (message.author.bot) {
				return;
			}
			for (let i = 0; i < this.commands.length; i++) {
				let commandPrefix = this.commands[i].name;
				if (message.content.startsWith(commandPrefix)) {
					message.content = message.content.replace(commandPrefix + " ", "");
					this.commands[i].handle(message);
					break;
				}
			}
		});
	}

	registerCommand(command) {
		this.commands.push(command);
	}

	login(callback = () => {
	}) {
		this.client.login(this.config.get()["botToken"]).then(() => {
			callback();
		});
	}

	sendMessage(text, channelID) {
		return __awaiter(this, void 0, void 0, function* () {
			if (text.length === 0) {
				return Promise.resolve();
			}
			try {
				let channel = this.client.channels.cache.get(channelID);
				if (channel) {
					yield channel.send(text);
				}
			} catch (error) {
				console.log(error);
			}
		});
	}
}

exports.DiscordBot = DiscordBot;