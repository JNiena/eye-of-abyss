import {appendFileSync, existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync} from "fs";

export class Files {

	public static read(path: string): string {
		return readFileSync(path, "utf-8").toString();
	}

	public static readDirectory(path: string): string[] {
		let paths: string[] = readdirSync(path);
		for (let i = 0; i < paths.length; i++) {
			paths[i] = path + "/" + paths[i];
		}
		return paths;
	}

	public static write(path: string, data: string): void {
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