"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.Whitelist = void 0;
const filter_1 = require("./filter");

class Whitelist extends filter_1.Filter {
	processText(text) {
		for (let i = 0; i < this.words.length; i++) {
			if (text.toLowerCase().includes(this.words[i].toLowerCase())) {
				return true;
			}
		}
		return false;
	}
}

exports.Whitelist = Whitelist;