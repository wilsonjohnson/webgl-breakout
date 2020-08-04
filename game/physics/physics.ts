import { Component, Game,RenderComponent2d } from "../index";
import { CollisionComponent } from "./index";
import { mat4, vec2 } from "gl-matrix";
import { DllPlugin } from "webpack";
import { AABBCollider } from "./aabb-collider";
import { CircleCollider } from "./circle-collider";

export type PhysicsType =
	'static' |
	'kinematic' |
	'dynamic';

export type PhysicsUpdate = 'fixed' | 'frame';

const HALF_PI = Math.PI / 2;
const QUARTER_PI = Math.PI / 4;
const THREE_QUARTERS_PI = 3 * Math.PI / 4;
const SEVEN_QUARTERS_PI = 7 * Math.PI / 4;
const TAU = Math.PI * 2;

export class Physics extends Component {
	private static INSTANCE: Physics;
	public static UPDATE: PhysicsUpdate = 'frame';
	public renderer: RenderComponent2d;
	public render: (context: CanvasRenderingContext2D) => void = _ => {};

	constructor() {
		super()
	}

	static get instance(): Physics {
		return Physics.INSTANCE = Physics.INSTANCE || new Physics();
	}

	static aabbOnCircle( aabb: AABBCollider, circle: CircleCollider ) {
		const dots = aabb.dots;
		const center = dots[0];
		const box2circle = vec2.sub( vec2.create(), circle.body.position, center );
		const box2circleNormal = vec2.normalize( vec2.create(), box2circle );
		const box2circleMagnitude = vec2.length( box2circle );
		let closest: vec2 = vec2.create();
		let as_line: vec2 = vec2.create();
		let mins = [TAU,TAU];
		let selecteds = [vec2.create(),vec2.create()];
		for ( let current of dots.slice(1) ) {
			const shifted = vec2.subtract( vec2.create(), current, center );
			const angle = vec2.angle( box2circle, shifted );
			const [min1,min2] = mins;
			const [sel1,sel2] = selecteds;
			if ( angle <= min1 ) {
				mins = [angle,min1];
				selecteds = [shifted,sel1];
			} else if ( angle <= min2 ) {
				mins[1] = angle;
				selecteds = []
			}
			second = min;
			min = angle;
			closest = shifted;
		}
		const dot = vec2.dot( closest, box2circleNormal );
		const projection = vec2.scale(vec2.create(), box2circleNormal, dot);
		if ( dot + circle.body.radius > box2circleMagnitude ) {
			console.log( `Collision Circle ${circle.id} => AABB ${aabb.id}` );
		}
		Physics.instance.render = (context: CanvasRenderingContext2D) => {
			context.strokeStyle = 'cyan';
			context.beginPath();
			context.moveTo( center[0], center[1] );
			context.lineTo( closest[0] + center[0], closest[1] + center[1] );
			context.stroke();
			context.closePath();
			context.beginPath();
			context.moveTo( center[0], center[1] );
			context.lineTo( box2circle[0] + center[0], box2circle[1] + center[1] );
			context.stroke();
			context.closePath();
			context.strokeStyle = 'magenta'
			context.beginPath();
			context.moveTo( center[0], center[1] );
			context.lineTo( projection[0] + center[0], projection[1] + center[1] );
			context.stroke();
			context.closePath();
		};
		// if (box2circleMagnitude - max - circle.body.radius > 0 && box2circleMagnitude > 0) {
			
		// } else {
		// 	Physics.instance.render = (context: CanvasRenderingContext2D) => {
		// 		context.strokeStyle = 'green';
		// 		context.beginPath();
		// 		context.moveTo( v[0], v[1] );
		// 		context.lineTo( circle.body.position[0], circle.body.position[1] );
		// 		context.stroke();
		// 		context.closePath();
		// 	};
		// }
	}

	public addComponent( component: CollisionComponent ) {
		// TODO: add custom add and destroy to physics engine

		super.addComponent( component );
	}

	public fixedUpdate( delta: number, transform?: mat4 ) {
		if ( Physics.UPDATE === 'fixed' ) this.step( delta );
	}

	public update( delta: number, transform?: mat4 ) {
		if ( Physics.UPDATE === 'frame' ) this.step( delta );
	}

	public toggleRender() {
		const components = (this.components.filter( c => c instanceof CollisionComponent ) as CollisionComponent[]);
		if ( this.renderer ) {
			this.renderer.destroy();
			this.renderer = undefined;
		} else {
			this.renderer = new RenderComponent2d( Game.canvas, context => {
				for ( let i = 0; i < components.length; i++ ) {
					for ( let j = i + 1; j < components.length; j++ ) {
						const a = components[i].body.position;
						const b = components[j].body.position;
						context.strokeStyle = 'orange';
						context.beginPath();
						context.moveTo( a[0], a[1] );
						context.lineTo( b[0], b[1] );
						context.stroke();
						context.closePath();
					}
				}
				this.render( context );
			});
			Game.instance.scene.addComponent( this.renderer );
		}
		components.forEach( component => component.toggleRender() );
	}

	public step( delta: number ) {
		const components = (this.components.filter( c => c instanceof CollisionComponent ) as CollisionComponent[]);
		components.forEach( x => x.step( delta ) );

		for ( let i = 0; i < components.length; i++ ) {
			for ( let j = i + 1; j < components.length; j++ ) {
				components[i].collide( components[j] );
			}
		}
	}
}
