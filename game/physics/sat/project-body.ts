import { vec2 } from "gl-matrix";
import { Body, Polygon, Circle, Rectangle } from "../bodies/index";

interface Projection<T> {
	min: T;
	max: T;
}

export type ScalarProjection = Projection<number>;
export type Vec2Projection = Projection<vec2>;


export function scalarProjectBody( b: Body, axis: vec2 ) : ScalarProjection {
	// We'll handle projections differently for polygons and circles
    // Polygon case
    if ( b instanceof Polygon ) {

        // First, grab the first vertex and set it to be our current minimum
        // and maximum. We need to start somewhere, right?
        let min = b.scalarProjectUnit(0, axis);
        let max = min;

        // Loop through all vertices on the body,
        // project the vertex, then check to see if it's less than the current
        // min or greater than the current max
        for (let i = 0; i < b.vertices.length; i++) {
            // Project it using scalar projection (Note, we've added a .scalarProjectUnit() method to
            // our vector class.  I'll leave that for you to figure out how to
            // do)
            let p = b.scalarProjectUnit(i, axis);

            // Check if it's smaller or larger than the min or max,
            // respectively
            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }
        // Return the min and max values
        return {min, max};
    } else if (b instanceof Circle) {

        // Cirle case
        // Cirles don't have vertices, so we project the center onto the axis,
        // and offset the min and max by the radius of the circle.
        let p = b.scalarProjectUnit(axis);
        return {min: p - b.scaledRadius, max: p + b.scaledRadius};
    }
}

export function projectBody( body: Body ): Vec2Projection {
	// Only deal with two types of bodies...
        // Those with vertices, and circles

        // Polygon's and Rectangles
        if ( body instanceof Polygon || body instanceof Rectangle ) {
            // Keep track of min and max values as we move through the vertices
            let minx = Number.POSITIVE_INFINITY;
			let miny = Number.POSITIVE_INFINITY;
			let maxx = Number.NEGATIVE_INFINITY;
			let maxy = Number.NEGATIVE_INFINITY;

            // Loop through all vertices
            body.vertices.forEach(v => {
                // Grab x and y off the vertex
                let [x, y] = v;

                if (x < minx) {
                    // Else, minx has a previous value, so check if the next
                    // value is smaller than the previously stored value
                    // If so, update minx;
                    minx = x;
                }

                // Do the same for the other three coordinate points
                if (y < miny) {
                    miny = y;
                }

                if (x > maxx) {
                    maxx = x;
                }

                if (y > maxy) {
                    maxy = y;
                }
            });

            // Return an object with min and max coordinates
            return {
                max: vec2.fromValues(maxx, maxy),
                min: vec2.fromValues(minx, miny),
            };
        }

        // Else, we have a circle!
        else {
            // Circles are easy,
            // it's position refers to the center, so we subtract or add
            // the radius as needed to get the min and max
            let cx = body.position[0],
                cy = body.position[1],
                r = this.body.scaledRadius;
            return {
                max: vec2.fromValues(
                    cx + r,
                    cy + r
				),
                min: vec2.fromValues(
                    cx - r,
                    cy - r
				)
            };
        }
}
