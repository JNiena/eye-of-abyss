"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Files_1 = require("./Files");
class Config {
    constructor(path) {
        this.config = JSON.parse(Files_1.Files.read(path));
        this.path = path;
    }
    get() {
        return this.config;
    }
    set(data) {
        this.config = data;
    }
    save() {
        Files_1.Files.delete(this.path);
        Files_1.Files.write(this.path, JSON.stringify(this.config, null, "\t"));
    }
}
exports.Config = Config;
