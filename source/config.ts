import {Files} from "./files";

export class Config {

	private config: object;

	constructor(path: string) {
		this.config = JSON.parse(Files.read(path));
	}

	get(): object {
		return this.config;
	}

}