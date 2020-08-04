import { Body } from './index';
import { vec2 } from 'gl-matrix';

export class Circle extends Body {
    constructor(
		position: vec2,
		public radius: number,
		public scale: number = 1
	) {
		super(position);
	}
	
	public get scaledRadius(): number {
		return this.radius * this.scale;
	}
    scalarProjectUnit(axis: vec2): number {
        throw new Error('Method not implemented.');
    }
}
