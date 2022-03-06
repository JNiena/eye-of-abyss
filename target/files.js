"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const fs_1 = require("fs");
class Files {
    static read(filePath) {
        return (0, fs_1.readFileSync)(filePath, "utf-8").toString();
    }
    static readAll(directoryPath) {
        let directory = (0, fs_1.readdirSync)(directoryPath);
        let files = [];
        for (let i = 0; i < directory.length; i++) {
            files.push(this.read(directory[i]));
        }
        return files;
    }
    static write(filePath, data = "") {
        (0, fs_1.writeFileSync)(filePath, data);
    }
    static exists(filePath) {
        return (0, fs_1.existsSync)(filePath);
    }
}
exports.Files = Files;
