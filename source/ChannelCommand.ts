import {Command} from "./Command";

export class ChannelCommand extends Command {

	private channelID: string;

	constructor(channelID: string, name: string, handler: Function) {
		super(name, handler);
		this.channelID = channelID;
	}

	handle(message: any) {
		if (message.channel.id === this.channelID) {
			super.handle(message);
		}
	}

}