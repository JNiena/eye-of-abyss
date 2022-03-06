"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
const filter_1 = require("./filter");
class Blacklist extends filter_1.Filter {
    processText(text) {
        for (let i = 0; i < this.words.length; i++) {
            if (text.toLowerCase().includes(this.words[i])) {
                return "";
            }
        }
        return text;
    }
}
exports.Blacklist = Blacklist;
