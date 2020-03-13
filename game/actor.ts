import { Component } from "./index";
import { vec2 } from "gl-matrix";

export class Actor extends Component {
	constructor(
		public position: vec2 = vec2.create()
	) {
		super();
	}
}