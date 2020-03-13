import {Component} from '../index';
import { vec2 } from 'gl-matrix';

export class CollisionComponent extends Component {
	constructor(
		protected position: vec2
	) {
		super();
	}

	public collide( other: CollisionComponent ) {

	}

	public test( other: CollisionComponent ): boolean {

	}
}
