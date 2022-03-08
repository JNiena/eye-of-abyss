export class Command {

	public name: string;
	private handler: Function;

	constructor(name: string, handler: Function) {
		this.name = name;
		this.handler = handler;
	}

	handle(message: any) {
		this.handler(message);
	}

}