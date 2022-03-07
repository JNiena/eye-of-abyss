export class Config {

	private config: any;

	constructor(data: string) {
		this.config = JSON.parse(data);
	}

	get(): any {
		return this.config;
	}

}