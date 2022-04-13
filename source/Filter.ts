export interface Filter {

	complies(element: string): boolean;

	add(element: string): void;

	remove(element: string): void;

	get(): string[];

}