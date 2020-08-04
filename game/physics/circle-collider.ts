import {Physics, CollisionComponent, PhysicsType } from './index';
import { vec2 } from 'gl-matrix';
import { AABBCollider } from './aabb-collider';
import { RenderComponent2d, Game } from '../index';
import { Circle } from './bodies/index';

export class CircleCollider extends CollisionComponent {
	renderer: RenderComponent2d;
	constructor(
		radius: number = 1,
		type: PhysicsType,
		position: vec2 = vec2.create(),
		velocity: vec2 = vec2.create(),
		mass: number = 1,
		density: number = 1,
	) {
		super( type, new Circle(position, radius), velocity, mass, density );
	}

	public get body(): Circle {
		return super.body as Circle;
	}

	public set body( value: Circle ) {
		super.body = value;
	}

	public step( delta: number ) {
		if ( this.type === 'static' ) return;
		vec2.scaleAndAdd(
			this.body.position,
			this.body.position,
			this.velocity,
			delta
		);
	} 

	public toggleRender() {
		if ( this.renderer ) {
			this.renderer.destroy();
			this.renderer = undefined;
		}
		else {
			this.renderer = new RenderComponent2d(Game.canvas, context => {
				context.beginPath();
				context.strokeStyle = 'red';
				context.moveTo(this.body.position[0], this.body.position[1]);
				context.lineTo(this.body.position[0] + this.body.radius, this.body.position[1]);
				context.stroke();
				context.strokeStyle = 'green';
				context.ellipse(this.body.position[0], this.body.position[1], this.body.radius, this.body.radius, 0, 0, Math.PI*2);
				context.stroke();
				context.closePath();
			});
			this.addComponent( this.renderer );
		}
	}

	public collide( other: CollisionComponent ) {
		if ( other instanceof CircleCollider ) {
			const squaredDistance = vec2.squaredDistance( this.body.position, other.body.position );
			const radiiSquared = ( this.body.radius + other.body.radius ) ** 2;
			if ( squaredDistance < radiiSquared ) {
				// const midpoint = vec2.sub(
				// 	vec2.create(),
				// 	this.body.position,
				// 	other.position
				// );
				// vec2.normalize( midpoint, midpoint );
				// vec2.scale( midpoint, midpoint, squaredDistance ** .5 );
				// vec2.add( midpoint, midpoint, this.body.position );
				console.log( 'hit' );
			}
		}
		if ( other instanceof AABBCollider ) {
			Physics.aabbOnCircle( other, this );
		}
		// super.collide( other );
	}
}