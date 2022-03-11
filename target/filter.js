"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.Filter = void 0;

class Filter {
	constructor(words = []) {
		this.words = words;
	}

	addWord(word) {
		this.words.push(word.toLowerCase());
	}

	getWords() {
		return this.words;
	}

	removeWord(word) {
		this.words = this.words.filter(element => element !== word.toLowerCase());
	}
}

exports.Filter = Filter;