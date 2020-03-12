import {mat4} from 'gl-matrix';

export class Component {
  protected components: Component[] = [];

  public fixedUpdate( delta: number, transform?: mat4 ) {
    this.components.forEach( component => component.fixedUpdate( delta, transform ) );
  }
  
  public update( delta: number, transform?: mat4 ) {
    this.components.forEach( component => component.update( delta, transform ) );
  }

  public addComponent( component: Component ) {
    this.components.push( component );
  }
}