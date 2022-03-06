"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist_1 = require("./whitelist");
const minecraftbot_1 = require("./minecraftbot");
let whitelist = new whitelist_1.Whitelist();
let mcbot = new minecraftbot_1.MinecraftBot("nienabjs@gmail.com", "N13n4b3r", "play.hylioncraft.com");
mcbot.onMessage((message) => {
    console.log(message);
});
