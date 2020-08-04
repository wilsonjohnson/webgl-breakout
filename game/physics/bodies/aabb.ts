import { Body } from "./index";
import { scalarProjectBody, projectBody, Vec2Projection } from "../sat/index";

export class AABB {
	public projection: Vec2Projection;
	constructor(
		public body: Body
	) {
		this.projection = projectBody( body );
	}
}