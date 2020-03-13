import { Component } from './index';
import { vec2, mat4 } from 'gl-matrix';

export class RenderComponentWebGL extends Component {
    constructor(
		private canvas: HTMLCanvasElement,
		private render: (canvas: WebGL2RenderingContext) => void
	) {
		super();
	}

    public update(delta: number, transform?: mat4) {
        this.render(this.canvas.getContext('webgl2'));
    }
}
