export class GameError extends Error {
	private readonly rawError: unknown;

	constructor(rawError: unknown) {
		super();
		Object.setPrototypeOf(this, new.target.prototype);
		this.rawError = rawError;
	}

	// iterate through unknown rawError,
	// detect data type and create an
	// object that stores it. Do this in
	// the constructor.

	static logToLocalConsole(err: any): void {
		console.log(err);
	}

	logToLocalCache(): void {
		console.log(this.rawError);
	}

	logToRemote(): void {
		console.log(this.rawError);
	}

	// TODO implement getting error from cache
	getErrorCache(): Array<Error> {
		return [{ message: "Test error", name: "Test name", stack: "Test stack" }];
	}
}
