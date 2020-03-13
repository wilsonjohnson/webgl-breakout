import { Component } from './index';
import { vec2, mat4 } from 'gl-matrix';

export class RenderComponent2d extends Component {
    constructor(
		private canvas: HTMLCanvasElement,
		private render: (canvas: CanvasRenderingContext2D) => void
	) {
		super();
	}

    public update(delta: number, transform?: mat4) {
        this.render(this.canvas.getContext('2d'));
    }
}
