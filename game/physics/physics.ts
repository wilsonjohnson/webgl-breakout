export class Physics {
	private static INSTANCE: Physics;

	constructor() {

	}

	static get instance(): Physics {
		return Physics.INSTANCE = Physics.INSTANCE || new Physics();
	}
}
