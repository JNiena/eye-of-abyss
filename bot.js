const filesystem = require("fs");
const mineflayer = require("mineflayer");
const discord = require("discord.js");

let client = new discord.Client();
let bots = [];
let tempBotUsername = "";
let tempBotPassword = "";
let tempBot;
let botToken = JSON.parse(filesystem.readFileSync("config.json", "utf-8"))["botToken"];
let discordStarted = false;
let remoteAccessChannelID;

refreshBots = () => {
	let dir = filesystem.readdirSync("accounts");
	remoteAccessChannelID = JSON.parse(filesystem.readFileSync("config.json", "utf-8"))["remoteAccessChannelID"];
	for (let i = 0; i < dir.length; i++) {
		let fileName = "accounts/" + dir[i];
		if (!fileName.endsWith(".json")) continue;
		let json = JSON.parse(filesystem.readFileSync(fileName, "utf-8"));
		let log = json["general"]["logPath"];
		if (!json["general"]["enabled"]) continue;
		if (!filesystem.existsSync(log)) {
			filesystem.writeFileSync(log, "");
		}
		let continueOuter = false;
		for (let j = 0; j < bots.length; j++) {
			let bot = bots[j];
			if (bot.config === fileName) {
				continueOuter = true;
				break;
			}
		}
		if (continueOuter) continue;
		bots.push(new Bot(fileName, log));
	}
};

client.login(botToken).then(() => {
	refreshBots();
});

client.once("ready", () => {
	for (let i = 0; i < bots.length; i++) {
		setTimeout(() => {
			let bot = bots[i];

			bot.logChannel = client.channels.cache.find(channel => channel.id === bot.channelID);
			bot.startBot();
		}, Math.floor((Math.random() * 4000 * bots.length) + 2000));
	}

	discordStarted = true;
});

client.on("message", message => {
	if (message.author.bot) return;
	if (!message.member.hasPermission("ADMINISTRATOR")) return;
	if (!message.content.startsWith("!")) return;
	let remoteChannel = client.channels.cache.find(channel => channel.id === remoteAccessChannelID);
	if (message.channel.id === remoteChannel.id) {
		if (message.content.startsWith("!login")) {
			tempBotUsername = message.content.substring(message.content.indexOf(" ") + 1, message.content.indexOf(":"));
			tempBotPassword = message.content.substring(message.content.indexOf(":") + 1);
			message.delete().then(() => setTimeout(() => remoteChannel.send("Logged in"), 500));
		} else if (message.content === "!logout") {
			if (typeof tempBot === "undefined") return;
			setTimeout(() => remoteChannel.send("Logged out"), 500);
			tempBot.quit();
			tempBot = undefined;
		} else if (message.content.startsWith("!connect")) {
			if (tempBotUsername !== "" && tempBotPassword !== "") {
				let tempBotHost = message.content.substring(message.content.indexOf(" ") + 1);
				tempBot = mineflayer.createBot({
					host: tempBotHost,
					username: tempBotUsername,
					password: tempBotPassword,
					version: "1.16.5"
				});
				tempBot.on("message", message => {
					if (message === "" || message === null || !/\S/.test(message)) return;

					setTimeout(() => remoteChannel.send(message.toString()), 500);
				});
				setTimeout(() => remoteChannel.send("Connected to " + tempBotHost), 500);
			} else {
				setTimeout(() => remoteChannel.send("Enter login details"), 500);
			}
		} else if (message.content.startsWith("!send")) {
			if (typeof tempBot === "undefined") return;
			let toSend = message.content.substring(message.content.indexOf(" ") + 1);
			tempBot.chat(toSend);
		} else if (message.content.startsWith("!commands")) {
			setTimeout(() => remoteChannel.send("Commands:\n!login\n!logout\n!connect\n!send"), 500);
		}
	} else {
		for (let i = 0; i < bots.length; i++) {
			let bot = bots[i];
			if (message.channel.id !== bot.channelID) continue;
			let toSend = "";
			if (message.content === "!commands") {
				toSend = "Commands:\n!commands\n!send\n!queue\n!toggle log-all\n!toggle auto-rejoin\n!whitelist-add\n!whitelist-remove\n!whitelist\n!blacklist-add\n!blacklist-remove\n!blacklist\n!disconnect\n!connect\n!update";
			} else if (message.content.startsWith("!send")) {
				bot.mcBot.chat(message.content.substring(message.content.indexOf(" ") + 1));
			} else if (message.content.startsWith("!queue")) {
				let msg = message.content.replace("!queue ", "");
				let minutes = msg.substring(0, msg.indexOf(" "));
				msg = msg.substring(msg.indexOf(" ") + 1);
				setTimeout(() => {
					bot.mcBot.chat(msg);
				}, minutes * 60000);
				toSend = "Message queued.";
			} else if (message.content === "!whitelist") {
				toSend = "Whitelist:\n" + bot.whitelist.toString().replace(/,/g, ", ");
			} else if (message.content === "!blacklist") {
				toSend = "Blacklist:\n" + bot.blacklist.toString().replace(/,/g, ", ");
			} else if (message.content === "!update") {
				toSend = "Updated";
				bot.updateConfig();
				refreshBots();
			} else if (message.content === "!disconnect") {
				toSend = bot.mcBot.username + " disconnected.";
				bot.mcBot.quit();
			} else if (message.content === "!connect") {
				toSend = "Connected!";
				bot.mcBot.quit();
				bot.startBot();
			} else {
				let json = JSON.parse(filesystem.readFileSync(bot.config, "utf-8"));
				if (message.content === "!toggle log-all") {
					json["general"]["logAll"] = !json["general"]["logAll"];
					toSend = "Log-All: " + json["general"]["logAll"];
				} else if (message.content === "!toggle auto-rejoin") {
					json["ingame"]["autoRejoin"] = !json["ingame"]["autoRejoin"];
					toSend = "Auto-Rejoin: " + json["ingame"]["autoRejoin"];
				} else if (message.content === "!toggle log-locally") {
					json["general"]["logLocally"] = !json["general"]["logLocally"];
					toSend = "Log-Locally: " + json["general"]["logLocally"];
				} else if (message.content.startsWith("!whitelist-add")) {
					json["general"]["whitelist"].push(message.content.substring(message.content.indexOf(" ") + 1));
					toSend = "New-Whitelist: " + json["general"]["whitelist"].toString().replace(/,/g, ", ");
				} else if (message.content.startsWith("!whitelist-remove")) {
					json["general"]["whitelist"] = json["general"]["whitelist"].filter(item => item !== message.content.substring(message.content.indexOf(" ") + 1));
					toSend = "New-Whitelist: " + json["general"]["whitelist"].toString().replace(/,/g, ", ");
				} else if (message.content.startsWith("!blacklist-add")) {
					json["general"]["blacklist"].push(message.content.substring(message.content.indexOf(" ") + 1));
					toSend = "New-Blacklist: " + json["general"]["blacklist"].toString().replace(/,/g, ", ");
				} else if (message.content.startsWith("!blacklist-remove")) {
					json["general"]["blacklist"] = json["general"]["blacklist"].filter(item => item !== message.content.substring(message.content.indexOf(" ") + 1));
					toSend = "New-Blacklist: " + json["general"]["blacklist"].toString().replace(/,/g, ", ");
				}
				filesystem.writeFileSync(bot.config, JSON.stringify(json, null, "\t"));
				bot.updateConfig();
			}
			if (toSend !== "") setTimeout(() => bot.logChannel.send(toSend), 500);
		}
	}

});

class Bot {

	json;
	host;
	email;
	password;
	version;
	joinCommand;
	autoRejoin;
	logLocally;
	logDiscord;
	logAll;
	logPath;
	logChannel;
	whitelist;
	blacklist;
	channelID;
	pingRoleID;
	config;
	log;
	mcBot;
	firstJoin;

	constructor(config, log) {
		this.config = config;
		this.log = log;
		this.updateConfig();
		if (discordStarted) {
			this.logChannel = client.channels.cache.find(channel => channel.id === this.channelID);
			this.startBot();
		}
	}

	updateConfig = () => {
		this.json = JSON.parse(filesystem.readFileSync(this.config, "utf-8").toString());
		this.host = this.json["bot"]["host"];
		this.email = this.json["bot"]["email"];
		this.password = this.json["bot"]["password"];
		this.version = this.json["bot"]["version"];
		this.joinCommand = this.json["ingame"]["joinCommand"];
		this.autoRejoin = this.json["ingame"]["autoRejoin"];
		this.logLocally = this.json["general"]["logLocally"];
		this.logDiscord = this.json["general"]["logDiscord"];
		this.logAll = this.json["general"]["logAll"];
		this.logPath = this.json["general"]["logPath"];
		this.whitelist = this.json["general"]["whitelist"];
		this.blacklist = this.json["general"]["blacklist"];
		this.channelID = this.json["discord"]["channelID"];
		this.pingRoleID = this.json["discord"]["pingRoleID"];
	};

	startBot = () => {
		this.firstJoin = true;
		this.mcBot = mineflayer.createBot({
			host: this.host,
			username: this.email,
			password: this.password,
			version: this.version
		});
		this.mcBot.once("spawn", () => {
			this.firstJoin = false;
			this.mcBot.chat(this.joinCommand);
			setTimeout(() => this.logChannel.send(this.mcBot.username + " logged in."), 500);
		});
		this.mcBot.on("message", message => {
			if (this.autoRejoin) {
				if (message.toString().includes("It is daily restart time! You have been send to the Lobby server automatically.")) {
					this.logChannel.send(this.mcBot.username + " attempting auto-rejoin in 60 seconds.");
					setTimeout(() => this.mcBot.chat(this.joinCommand), 60000);
				}
			}
			if (!this.logDiscord) return;
			if (message === "" || message === null || !/\S/.test(message)) return;
			for (let i = 0; i < this.blacklist.length; i++) {
				let watchedPhrase = this.blacklist[i];
				let messageToCheck = message.toString().toLowerCase();
				if (messageToCheck.includes(watchedPhrase) && !this.logAll) return;
			}
			for (let i = 0; i < this.whitelist.length; i++) {
				let watchedPhrase = this.whitelist[i];
				let messageToCheck = message.toString().toLowerCase();
				if (!messageToCheck.includes(watchedPhrase) && !this.logAll) continue;
				if (this.logLocally) filesystem.appendFileSync(this.log, messageToCheck + "\n");
				if (this.pingRoleID.includes("@")) setTimeout(() => this.logChannel.send("<@&" + this.pingRoleID + ">"), 500);
				setTimeout(() => this.logChannel.send(message.toString()), 500);
				break;
			}
		});
		this.mcBot.on("kicked", (reason) => {
			this.logChannel.send(reason);
		});
	};

}