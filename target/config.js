"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.Config = void 0;
const files_1 = require("./files");

class Config {
	constructor(path) {
		this.config = JSON.parse(files_1.Files.read(path));
		this.path = path;
	}

	get() {
		return this.config;
	}

	set(data) {
		this.config = data;
	}

	save() {
		files_1.Files.delete(this.path);
		files_1.Files.write(this.path, JSON.stringify(this.config, null, "\t"));
	}
}

exports.Config = Config;