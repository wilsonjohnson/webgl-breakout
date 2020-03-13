import { Component, RenderComponent2d } from './';

export class Scene extends Component {
	constructor(
		canvas: HTMLCanvasElement
	) {
		super()
		const renderComponent = new RenderComponent2d(
			canvas,
			context => {
				context.fillStyle = 'black'
				context.fillRect( 0, 0, canvas.width, canvas.height );
			}
		);
		super.addComponent( renderComponent );
	}
}