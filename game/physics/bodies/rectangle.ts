import { Polygon } from "./index"
import { vec2 } from "gl-matrix";

export class Rectangle extends Polygon {
	constructor(
		public position: vec2,
		public dimensions: vec2 = vec2.create(),
		rotation: number = 0,
		origin?: vec2
	) {
		super(
			position,
			[
				vec2.create(),
				vec2.fromValues(dimensions[0], 0),
				vec2.clone(dimensions),
				vec2.fromValues(0, dimensions[1])
			],
			rotation,
			origin || vec2.scale( vec2.create(), dimensions, .5 ) 
		);
		this.update();
	}

	public update() {
		if ( !this.dimensions ) return; // prevent parent constructor from calling this function
		const x = this.dimensions[0];
		const y = this.dimensions[1];
		this.relativeVertices[1] = vec2.fromValues(x, 0);
		this.relativeVertices[2] = vec2.fromValues(x, y);
		this.relativeVertices[3] = vec2.fromValues(0, y);
		super.update();
	}
}