import {Files} from "./files";

export class Config {

	private config: any;

	constructor(path: string) {
		this.config = JSON.parse(Files.read(path));
	}

	get(): any {
		return this.config;
	}

}