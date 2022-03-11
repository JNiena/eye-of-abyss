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
            files.push(this.read(directoryPath + "/" + directory[i]));
        }
        return files;
    }
    static paths(directoryPath) {
        let paths = (0, fs_1.readdirSync)(directoryPath);
        for (let i = 0; i < paths.length; i++) {
            paths[i] = directoryPath + "/" + paths[i];
        }
        return paths;
    }
    static write(filePath, data = "") {
        (0, fs_1.appendFileSync)(filePath, data);
    }
    static delete(filePath) {
        (0, fs_1.unlinkSync)(filePath);
    }
    static exists(filePath) {
        return (0, fs_1.existsSync)(filePath);
    }
}
exports.Files = Files;
