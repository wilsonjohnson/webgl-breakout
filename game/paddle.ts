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
    vec2.add( this.position, this.position, vec2.scale(vec2.create(), vec2.random(vec2.create()), 1) );
    super.update( delta );
  }
}