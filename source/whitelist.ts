import {Filter} from "./filter";

export class Whitelist extends Filter {

	processText(text: string): boolean {
		for (let i = 0; i < this.words.length; i++) {
			if (text.toLowerCase().includes(this.words[i].toLowerCase())) return true;
		}
		return false;
	}

}