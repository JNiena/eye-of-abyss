"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Files_1 = require("./Files");
class Config {
    constructor(path) {
        this.path = path;
        this.data = JSON.parse(Files_1.Files.read(path));
    }
    get() {
        return this.data;
    }
    set(data) {
        this.data = data;
    }
    save() {
        if (this.path !== undefined) {
            Files_1.Files.delete(this.path);
            Files_1.Files.write(this.path, JSON.stringify(this.data, null, "\t"));
        }
    }
}
exports.Config = Config;
