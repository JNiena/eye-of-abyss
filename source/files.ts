import {existsSync, readdirSync, readFileSync, unlinkSync, appendFileSync} from "fs";

export class Files {

	static read(filePath: string): string {
		return readFileSync(filePath, "utf-8").toString();
	}

	static readAll(directoryPath: string): string[] {
		let directory: string[] = readdirSync(directoryPath);
		let files: string[] = [];
		for (let i = 0; i < directory.length; i++) {
			files.push(this.read(directoryPath + "/" + directory[i]));
		}
		return files;
	}

	static paths(directoryPath: string): string[] {
		let paths: string[] = readdirSync(directoryPath);
		for (let i = 0; i < paths.length; i++) {
			paths[i] = directoryPath + "/" + paths[i];
		}
		return paths;
	}

	static write(filePath: string, data: string = ""): void {
		appendFileSync(filePath, data);
	}

	static delete(filePath: string): void {
		unlinkSync(filePath);
	}

	static exists(filePath: string): boolean {
		return existsSync(filePath);
	}

}