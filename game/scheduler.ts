export interface Schedule {
  scheduled: boolean;
  clear(): boolean;
}

export class Scheduler {
  private schedules: Schedule[] = [];
  constructor() {}

  public schedule( interval: number, action: (delta: number) => void): Schedule {
    let then = performance.now();
    const ref = setInterval(() => {
      let now = performance.now();
      action(interval - now - then);
      then = now;
    }, interval );
    const index = this.schedules.length;
    const schedule: Schedule = {
      scheduled: true,
      clear: () => {
        if ( !schedule.scheduled ) return false;
        clearInterval( ref );
        this.schedules.splice( index, 1 );
        schedule.scheduled = false;
        return true;
      }
    }
    this.schedules.push( schedule );
    return schedule;
  }

  public clearAll() {
    for( let schedule of [...this.schedules] ) {
      schedule.clear();
    }
  }
}
