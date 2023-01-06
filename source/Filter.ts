export class Filter {

	private words: string[];

	public constructor(words: string[] = []) {
		this.words = words;
	}

	public add(word: string): void {
		this.words.push(word.toLowerCase());
	}

	public remove(word: string): boolean {
		if (!this.words.includes(word.toLowerCase())) {
			return false;
		}
		this.words = this.words.filter(element => element !== word.toLowerCase());
		return true;
	}

	public get(): string[] {
		return this.words;
	}

	public complies(element: string): boolean {
		for (let i = 0; i < this.words.length; i++) {
			if (this.words[i].includes("|") && this.handle_phrase(element.toLowerCase(), this.words[i].toLowerCase())) {
				return true;
			}
			else if (this.handle_word(element.toLowerCase(), this.words[i].toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	private handle_phrase(test: string, word: string): boolean {
		let words: string[] = word.split("|");
		for (let i = 0; i < words.length; i++) {
			if (!test.includes(words[i])) {
				return false;
			}
		}
		return true;
	}

	private handle_word(test: string, word: string): boolean {
		return test.includes(word);
	}

}