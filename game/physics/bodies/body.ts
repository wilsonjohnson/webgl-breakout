import { vec2 } from "gl-matrix";

export abstract class Body {
	constructor(
		public position: vec2,
		public rotation: number = 0,
		public origin: vec2 = vec2.create(),
	) {
	}

	public translate( by: vec2 ): Body {
		vec2.add( this.position, this.position, by );
		this.update();
		return this;
	}

	public update() {}
}