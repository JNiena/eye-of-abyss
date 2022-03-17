export class Filter {

	protected words: string[];

	public constructor(words: string[] = []) {
		this.words = words;
	}

	public addWord(word: string): void {
		this.words.push(word.toLowerCase());
	}

	public getWords(): string[] {
		return this.words;
	}

	public removeWord(word: string): void {
		this.words = this.words.filter(element => element !== word.toLowerCase());
	}

}