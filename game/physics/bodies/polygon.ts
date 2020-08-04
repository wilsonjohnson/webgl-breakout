import { Body } from "./index";
import { vec2 } from "gl-matrix";

export class Polygon extends Body {
	vertices: vec2[];

	constructor(
		position: vec2,
		protected relativeVertices: vec2[],
		rotation: number = 0,
		origin: vec2 = vec2.create()
	) {
		super( position, rotation, origin );
		this.update();
	}

	public update() {
		if ( !this.vertices ) this.vertices = this.relativeVertices.map( vertex => vec2.clone(vertex) );
		this.vertices.forEach( ( vertex, i ) => {
			vec2.add( vertex, this.relativeVertices[i], this.position );
			vec2.rotate(
				vertex,
				vertex,
				vec2.add(
					vec2.create(),
					this.position,
					this.origin
				),
				this.rotation
			);
		} );
	}

	scalarProjectUnit(index: number, axis: vec2): number {
		throw new Error("Method not implemented.");
	}
}