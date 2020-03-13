import {Physics, CollisionComponent} from './index';

export class CircleCollider extends CollisionComponent {
	constructor( private radius: number = 0 ) {
		super();
	}
}