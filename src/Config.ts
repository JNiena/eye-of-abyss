import { Files } from "./Files";

// Fix syncing issues
export class Config {
	private data: any;
	private path: string | undefined;

	public constructor(path: string) {
		this.path = path;
		this.data = JSON.parse(Files.read(path));
	}

	public get() {
		return this.data;
	}

	public set(data: any) {
		this.data = data;
	}

	public save() {
		if (this.path) {
			Files.delete(this.path);
			Files.write(this.path, JSON.stringify(this.data, null, "\t"));
		}
	}
}