export class Command {

	public channelID: string;
	public name: string;
	private handler: Function;

	constructor(channelID: string, name: string, handler: Function) {
		this.channelID = channelID;
		this.name = name;
		this.handler = handler;
	}

	handle(message: any): void {
		message.content = message.content.replace(this.name, "");
		this.handler(message);
		message.content = `${this.name}${message.content}`;
	}

}