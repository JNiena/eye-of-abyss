import {Files} from "./files";
import {Config} from "./config";

export class BotLoader {

	static loadFromFile<T>(path: string): T {
		return new Object(new Config(path)) as T;
	}

	static loadFromDirectory<T>(path: string): T[] {
		let configPaths: string[] = Files.readAll(path);
		let accounts: T[] = [];
		for (let i = 0; i < configPaths.length; i++) {
			accounts.push(this.loadFromFile<T>(configPaths[i]));
		}
		return accounts;
	}

}