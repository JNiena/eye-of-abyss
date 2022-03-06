import * as filesystem from "fs";

export class Files {

	static read(filePath: string): string {
		return filesystem.readFileSync(filePath, "utf-8").toString();
	}

	static readAll(directoryPath: string): string[] {
		let directory: string[] = filesystem.readdirSync(directoryPath);
		let files: string[] = [];
		for (let i = 0; i < directory.length; i++) {
			files.push(this.read(directory[i]));
		}
		return files;
	}

	static write(filePath: string, data: string = ""): void {
		filesystem.writeFileSync(filePath, data);
	}

	static exists(filePath: string): boolean {
		return filesystem.existsSync(filePath);
	}

}