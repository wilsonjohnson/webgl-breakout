import {Component} from '../index';
import { vec2, mat4 } from 'gl-matrix';
import { Physics, PhysicsType } from './physics';
import { Body } from './bodies/index';

export class CollisionComponent extends Component {
	static instance: number = 0;
	public id: number;
	constructor(
		public readonly type: PhysicsType,
		public body: Body,
		public velocity: vec2,
		public mass: number = 1,
		public density: number = 1
	) {
		super();
		this.id = CollisionComponent.instance++;
		Physics.instance.addComponent(this);
	}

	public collide( other: CollisionComponent ) {
	}

	public test( other: CollisionComponent ): boolean {
		return false;
	}

	public step( delta: number ) {
	}

	public toggleRender() {

	}
}
