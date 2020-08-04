import {Physics, CollisionComponent, PhysicsType, CircleCollider } from './index';
import { vec2 } from 'gl-matrix';
import { Game,RenderComponent2d } from '../index';
import { Rectangle, Polygon } from './bodies/index';

export class AABBCollider extends CollisionComponent {
	renderer: RenderComponent2d;
	
	constructor(
		dimensions: vec2 = vec2.fromValues(1,1),
		type: PhysicsType,
		position: vec2 = vec2.create(),
		velocity: vec2 = vec2.create(),
		mass: number = 1,
		density: number = 1,
	) {
		super( type, new Rectangle(position, dimensions), velocity, mass, density );
		
	}

	public get body(): Rectangle {
		return super.body as Rectangle;
	}

	public set body( value: Rectangle ) {
		super.body = value;
	}

	public get dots(): vec2[] {
		const center = vec2.scaleAndAdd(vec2.create(), this.body.position, this.body.dimensions, .5 );
		const top_right = vec2.add(vec2.create(), this.body.position, this.body.dimensions);
		return [
			center,
			this.body.position,
			vec2.fromValues( this.body.position[0], top_right[1] ),
			top_right,
			vec2.fromValues( top_right[0], this.body.position[1] )
		];
	}

	public toggleRender() {
		if ( this.renderer ) {
			this.renderer.destroy();
			this.renderer = undefined;
		}else {
			this.renderer = new RenderComponent2d(Game.canvas, context => {
				const verts = this.body.vertices;
				const center = vec2.add( vec2.create(), this.body.position, this.body.origin );
				context.strokeStyle = 'red';
				context.beginPath();
				context.moveTo(center[0], center[1]);
				context.lineTo(verts[0][0], verts[0][1]);
				context.stroke();
				context.closePath();
				context.strokeStyle = 'green';
				context.beginPath();
				context.moveTo(verts[verts.length - 1][0], verts[verts.length - 1][1]);
				for ( let vert of verts ) {
					context.lineTo(vert[0], vert[1]);
				}
				context.stroke();
				context.closePath();
			});
			this.addComponent( this.renderer );
		}
	}

	public step( delta: number ) {
		if ( this.type === 'static' ) return;
		vec2.scaleAndAdd(
			this.body.position,
			this.body.position,
			this.velocity,
			delta
		);
		this.body.rotation += 0.01;
		this.body.update();
	} 

	public collide( other: CollisionComponent ) {
		if ( this.type === 'static' && other.type === 'static' ) return;
		const [x1,y1]=this.body.position;
		const [w1,h1]=this.body.dimensions;
		if ( other instanceof AABBCollider ) {
			const [x2,y2]=other.body.position;
			const [w2,h2]=other.body.dimensions;
			if (
				x1 < x2 + w2 &&
				x1 + w1 > x2 &&
				y1 < y2 + h2 &&
				y1 + h1 > y2
			) {
				// const midpoint = vec2.sub(
				// 	vec2.create(),
				// 	this.body.position,
				// 	other.position
				// );
				// vec2.normalize( midpoint, midpoint );
				// vec2.scale( midpoint, midpoint, squaredDistance ** .5 );
				// vec2.add( midpoint, midpoint, this.body.position );
				console.log( `Collision ${this.id} => ${other.id}` );
			}
		}
		if ( other instanceof CircleCollider ) {
			Physics.aabbOnCircle( this, other );
		}
		// super.collide( other );
	}
}