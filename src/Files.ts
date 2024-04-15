import { appendFileSync, existsSync, readdirSync, readFileSync, truncateSync, unlinkSync, writeFileSync } from "fs";

export class Files {
	public static read(path: string) {
		return readFileSync(path, "utf-8").toString();
	}

	public static readDirectory(path: string) {
		return readdirSync(path, "utf-8");
	}

	public static write(path: string, data: string) {
		if (!this.exists(path)) { this.create(path); }
		appendFileSync(path, data, "utf-8");
	}

	public static create(path: string) {
		writeFileSync(path, "", "utf-8");
	}

	public static delete(path: string) {
		unlinkSync(path);
	}

	public static clear(path: string) {
		truncateSync(path, 0);
	}

	public static exists(path: string) {
		return existsSync(path);
	}
}