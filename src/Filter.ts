export class Filter {
	public static complies(words: string[], element: string) {
		for (let i = 0; i < words.length; i++) {
			if (words[i].includes("|") && this.testWithPhrase(element.toLowerCase(), words[i].toLowerCase())) { return true; }
			else if (this.testWithWord(element.toLowerCase(), words[i].toLowerCase())) { return true; }
		}
		return false;
	}

	private static testWithPhrase(test: string, word: string) {
		let words: string[] = word.split("|");
		for (let i = 0; i < words.length; i++) { if (!test.includes(words[i])) { return false; } }
		return true;
	}

	private static testWithWord(test: string, word: string) {
		return test.includes(word);
	}
}