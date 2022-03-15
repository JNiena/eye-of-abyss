export class Filter {

	protected words: string[];

	constructor(words: string[] = []) {
		this.words = words;
	}

	addWord(word: string): void {
		this.words.push(word.toLowerCase());
	}

	getWords(): string[] {
		return this.words;
	}

	removeWord(word: string): void {
		this.words = this.words.filter(element => element !== word.toLowerCase());
	}

}