export class Status {
	constructor(
		public status: UpDown
	) { }
}

export enum UpDown {
	Up = "Up",
	Down = "Down"
}