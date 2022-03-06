import {Filter} from "./filter";

export class Blacklist extends Filter {

	processText(text: string): string {
		for (let i = 0; i < this.words.length; i++) {
			if (text.toLowerCase().includes(this.words[i])) {
				return "";
			}
		}
		return text;
	}

}