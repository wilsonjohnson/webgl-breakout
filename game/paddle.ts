import {RenderComponent2d, Actor} from './index';
import {vec2, mat4} from 'gl-matrix';

export class Paddle extends Actor {
	velocity: vec2 = vec2.create();
  constructor (
    private canvas: HTMLCanvasElement,
    position: vec2 = vec2.create()
  ) {
    super( position );
    const renderComponent = new RenderComponent2d( canvas, context => {
      context.fillStyle = 'white';
      context.fillRect( this.position[0] - 50, this.position[1], 100, 20 );
    } );

    super.addComponent( renderComponent );
  }

  public update( delta: number, transform?: mat4 ) {
	const acceleration = vec2.scale(vec2.create(), vec2.random(vec2.create()), 100);
	this.velocity = vec2.lerp( this.velocity, this.velocity, acceleration, .1 );
	this.velocity[1] = 0;
	const target = vec2.add( vec2.create(), this.position, this.velocity );
	vec2.lerp( this.position, this.position, target, .1 );
	vec2.min( this.position, this.position, vec2.fromValues(this.canvas.width - 50,this.position[1]) );
	vec2.max( this.position, this.position, vec2.fromValues(0 + 50,this.position[1]) );
    super.update( delta );
  }
}