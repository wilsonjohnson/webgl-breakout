import {mat4} from 'gl-matrix';

export class Component {
  protected components: Component[] = [];
	private clear: () => void = () => {
		this.components.forEach( x => x.clear() );
	};

	private registerDelete( value: () => void ) {
		const remove = this.clear;
		this.clear = () => {
			remove();
			value();
		}
	}

	public destroy() {
		this.clear();
	}
  public fixedUpdate( delta: number, transform?: mat4 ) {
	try {
		this.components.forEach( component => component.fixedUpdate( delta, transform ) );
	} catch (e) {
		// console.log( this.components );
	}
  }

  public update( delta: number, transform?: mat4 ) {
    this.components.forEach( component => component.update( delta, transform ) );
  }

  public addComponent( component: Component ) {
	const start = this.components.length;
	this.components.push( component );
	component.registerDelete(() => {
		this.components.splice( start, 1 );
	});
  }
}