import {Component, Scheduler, Scene, Paddle, Ball } from './index'
import { vec2 } from 'gl-matrix';

export class Game extends Component {
  
  private scheduler: Scheduler = new Scheduler();
  private run = false;

  constructor( private canvas: HTMLCanvasElement ) {
	super()
	const scene = new Scene( canvas );
	this.addComponent( scene );
	const paddle = new Paddle( canvas, vec2.fromValues( canvas.width / 2, canvas.height - 70 ) );
	scene.addComponent( paddle );
	const ball = new Ball( canvas, vec2.fromValues( canvas.width / 2, canvas.height / 2 ) );
	scene.addComponent( ball );
  }

  public start() {
    this.run = true;
    this.scheduler.schedule( 1000 / 60, ( delta: number ) => this.fixedUpdate( delta ) );
    let last = 0;
    const frame: FrameRequestCallback = ( timestamp ) => {
      const delta = timestamp - last;
      last = timestamp;
      this.update( delta );
      if ( this.run ) window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame( frame );
  }

  public step() {
  }

  public stop() {
    this.run = false;
  }
}