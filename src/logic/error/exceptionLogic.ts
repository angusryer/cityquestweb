export class GameError extends Error {
	message: any;
	constructor(props: any) {
		super(props)
		Object.setPrototypeOf(this, new.target.prototype)
		this.message = props
	}

	logError() {
		console.log(this.message)
	}

}
