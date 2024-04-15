import { Files } from "./Files";

export class Config {
	private path: string;
	private data: any;

	public constructor(path: string) {
		this.path = path;
		this.load();
	}

	public get() {
		return this.data;
	}

	public set(data: any) {
		this.data = data;
	}

	public save() {
		Files.clear(this.path);
		Files.write(this.path, JSON.stringify(this.data, null, "\t"));
	}

	public load() {
		this.data = JSON.parse(Files.read(this.path));
	}
}