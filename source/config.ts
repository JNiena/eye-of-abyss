import {Files} from "./files";

export class Config {

	private config: any;
	private path: string;

	constructor(path: string) {
		this.config = JSON.parse(Files.read(path));
		this.path = path;
	}

	get(): any {
		return this.config;
	}

	set(data: object): void {
		this.config = data;
	}

	save(): void {
		Files.delete(this.path);
		Files.write(this.path, JSON.stringify(this.config, null, "\t"));
	}

}