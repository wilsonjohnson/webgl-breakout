import { Component, Scheduler, Scene, Paddle, Ball } from './index'
import { Physics, AABBCollider } from './physics/index'
import { vec2 } from 'gl-matrix';
import { RenderComponent2d } from './render-component-2d';

export class Game extends Component {
  
	public static instance: Game;

  private scheduler: Scheduler = new Scheduler();
  private run = false;
	public static canvas: HTMLCanvasElement;
	public scene: Scene;
  constructor( private canvas: HTMLCanvasElement ) {
	super()
	Game.instance = this;
	Game.canvas = canvas;
	this.scene = this.init( canvas );
	let running = true;
	canvas.addEventListener('click', () => {
		// if ( running ) scene.destroy();
		// else scene = this.init( canvas );
		// running = !running;
		Physics.instance.toggleRender();
	} );
  }

  public init( canvas: HTMLCanvasElement ) {
	const physics = Physics.instance;
	this.addComponent( physics );
	const scene = new Scene( canvas );
	this.addComponent( scene );
	const paddle = new Paddle( canvas, vec2.fromValues( canvas.width / 2, canvas.height - 70 ) );
	scene.addComponent( paddle );
	const ball = new Ball( canvas, vec2.fromValues( canvas.width / 2, canvas.height / 2 ) );
	scene.addComponent( ball );
	const get_wall_renderer = (wall: AABBCollider) => new RenderComponent2d(canvas, context => {
		context.fillStyle = 'white';
		context.fillRect(wall.body.position[0], wall.body.position[1], wall.body.dimensions[0], wall.body.dimensions[1] );
	});
	const wall_left = new AABBCollider(vec2.fromValues( 5, canvas.height), 'static', vec2.fromValues(5,0));
	const wall_right = new AABBCollider(vec2.fromValues( 5, canvas.height), 'static', vec2.fromValues(canvas.width - 10, 0 ));
	const wall_top = new AABBCollider(vec2.fromValues( canvas.width, 5), 'static', vec2.fromValues(0, canvas.height - 10 ));
	const wall_bottom = new AABBCollider(vec2.fromValues( canvas.width, 25), 'static', vec2.fromValues(0, 5));
	// const box_test = new AABBCollider(vec2.fromValues( 20, 20), 'static', vec2.fromValues((canvas.width / 2) + 50, canvas.height/2));
	// wall_left.toggleRender();
	// wall_right.toggleRender();
	// wall_top.toggleRender();
	// wall_bottom.toggleRender();
	scene.addComponent(wall_left);
	scene.addComponent(wall_right);
	scene.addComponent(wall_top);
	scene.addComponent(wall_bottom);
	// scene.addComponent(box_test);
	return scene;
  }

  public start() {
	  console.log( this );
    this.run = true;
    this.scheduler.schedule( 1000 / 60, ( delta: number ) => this.fixedUpdate( delta ) );
    let last = 0;
    const frame: FrameRequestCallback = ( timestamp ) => {
      const delta = timestamp - last;
	  last = timestamp;
      this.update( delta / 100 );
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