import {Component, RenderComponent2d, Actor} from './index';
import {vec2, mat4} from 'gl-matrix';

export class Ball extends Actor {
	velocity: vec2 = vec2.scale(vec2.create(), vec2.random(vec2.create()), 5 );
  constructor (
    private canvas: HTMLCanvasElement,
    position: vec2 = vec2.create()
  ) {
    super( position );
    const renderComponent = new RenderComponent2d( canvas, context => {
      context.fillStyle = 'white';
      context.fillRect( this.position[0] - 5, this.position[1] - 5, 10, 10 );
    } );

    super.addComponent( renderComponent );
  }

  public update( delta: number, transform?: mat4 ) {
	super.update( delta, transform );
  }

  public fixedUpdate( delta: number, transform?: mat4 ) {
	const target = vec2.add( vec2.create(), this.position, this.velocity );
	if ( target[1] > this.canvas.height ) {
		target[1] -= target[1] - this.canvas.height;
		this.velocity[1] = -this.velocity[1];
	}

	if ( target[0] > this.canvas.width ) {
		target[0] -= target[0] - this.canvas.width;
		this.velocity[0] = -this.velocity[0];
	}

	if ( target[0] < 0 ) {
		target[0] -= target[0];
		this.velocity[0] = -this.velocity[0];
	}

	if ( target[1] < 0 ) {
		target[1] -= target[1];
		this.velocity[1] = -this.velocity[1];
	}

	this.position = target;
    super.fixedUpdate( delta, transform );
  }
}