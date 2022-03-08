import {Files} from "./files";

export class Config {

	private config: any;

	constructor(data: string) {
		this.config = JSON.parse(data);
	}

	get(): any {
		return this.config;
	}

	set(data: object) {
		this.config = data;
	}

	save(path: string) {
		Files.delete(path);
		Files.write(path, JSON.stringify(this.config, null, "\t"))
	}

}