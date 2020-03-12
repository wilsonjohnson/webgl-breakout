import {Component, RenderComponent2d} from './';
import {vec2, mat4} from 'gl-matrix';

export class Paddle extends Component {
  constructor (
    private canvas: HTMLCanvasElement,
    private position: vec2 = vec2.create()
  ) {
    super();
    const renderComponent = new RenderComponent2d( canvas, context => {
      context.fillStyle = 'white';
      context.fillRect( this.position[0], this.position[1], 20, 20 );
    } );

    super.addComponent( renderComponent );
  }

  public update( delta: number, transform?: mat4 ) {
    const context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = 'black';
    context.fillRect( 0, 0, this.canvas.width, this.canvas.height );

    vec2.add( this.position, this.position, vec2.random(vec2.create()) );
    super.update( delta );
  }
}