import {Component, Scheduler} from './'

export class Game extends Component {
  
  private scheduler: Scheduler = new Scheduler();
  private run = false;

  constructor() {
    super()
  }

  public start() {
    this.run = true;
    this.scheduler.schedule( 1000 / 60, ( delta: number ) => this.fixedUpdate( delta ) );
    let last = 0;
    const frame: FrameRequestCallback = ( timestamp ) => {
      const delta = timestamp - last;
      last = timestamp;
      this.update( delta );
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