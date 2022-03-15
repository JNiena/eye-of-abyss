"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whitelist = void 0;
const Filter_1 = require("./Filter");
class Whitelist extends Filter_1.Filter {
    processText(text) {
        for (let i = 0; i < this.words.length; i++) {
            if (text.toLowerCase().includes(this.words[i].toLowerCase()))
                return true;
        }
        return false;
    }
}
exports.Whitelist = Whitelist;
