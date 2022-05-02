import {appendFileSync, existsSync, readFileSync, unlinkSync, writeFileSync} from "fs";

export class Files {

	public static read(path: string): string {
		return readFileSync(path, "utf-8").toString();
	}

	public static write(path: string, data: string): void {
		if (!this.exists(path)) this.create(path);
		appendFileSync(path, data);
	}

	public static create(path: string): void {
		writeFileSync(path, "");
	}

	public static delete(path: string): void {
		unlinkSync(path);
	}

	public static exists(path: string): boolean {
		return existsSync(path);
	}

}