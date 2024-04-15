export class Util {
	public static random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}