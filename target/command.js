"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.Command = void 0;

class Command {
	constructor(name, handler) {
		this.name = name;
		this.handler = handler;
	}

	handle(message) {
		this.handler(message);
	}
}

exports.Command = Command;