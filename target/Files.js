"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const fs_1 = require("fs");
class Files {
    static read(path) {
        return (0, fs_1.readFileSync)(path, "utf-8").toString();
    }
    static readDir(directoryPath) {
        let paths = (0, fs_1.readdirSync)(directoryPath);
        for (let i = 0; i < paths.length; i++) {
            paths[i] = directoryPath + "/" + paths[i];
        }
        return paths;
    }
    static write(path, data) {
        (0, fs_1.appendFileSync)(path, data);
    }
    static create(path) {
        (0, fs_1.writeFileSync)(path, "");
    }
    static delete(path) {
        (0, fs_1.unlinkSync)(path);
    }
    static exists(path) {
        return (0, fs_1.existsSync)(path);
    }
}
exports.Files = Files;
