import {RenderComponent2d, Actor} from './index';
import {vec2, mat4} from 'gl-matrix';
import { AABBCollider } from './physics/index';

export class Paddle extends Actor {
	collider: AABBCollider;
	private velocity = vec2.create();
  constructor (
    private canvas: HTMLCanvasElement,
    position: vec2 = vec2.create()
  ) {
    super( position );
    const renderComponent = new RenderComponent2d( canvas, context => {
	  context.fillStyle = 'white';
      context.fillRect( this.collider.body.position[0], this.collider.body.position[1], this.collider.body.dimensions[0], this.collider.body.dimensions[1] );
    } );

	this.collider = new AABBCollider(vec2.fromValues( 100, 20 ), 'kinematic', this.position );
	super.addComponent( renderComponent );
	super.addComponent( this.collider );
	
  }

  public update( delta: number, transform?: mat4 ) {
	const acceleration = vec2.scale(vec2.create(), vec2.random(vec2.create()), 100);
	this.velocity = vec2.lerp( this.velocity, this.velocity, acceleration, .1 );
	this.velocity[1] = 0;
	const target = vec2.add( vec2.create(), this.collider.body.position, this.velocity );
	vec2.lerp( this.collider.body.position, this.collider.body.position, target, .1 );
	vec2.min( this.collider.body.position, this.collider.body.position, vec2.fromValues(this.canvas.width - this.collider.body.dimensions[0], this.collider.body.position[1]) );
	vec2.max( this.collider.body.position, this.collider.body.position, vec2.fromValues(0, this.collider.body.position[1]) );
	this.position = this.collider.body.position;
    super.update( delta );
  }
}