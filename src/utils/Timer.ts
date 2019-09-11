class Timer {
  private startTime: number = 0;
  private stopTime: number = 0;

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.stopTime = Date.now();
  }

  reset() {
    this.startTime = 0;
    this.stopTime = 0;
  }

  get ellapseTime() {
    return ((this.stopTime - this.startTime) / 1000).toFixed(2);
  }
}

export default new Timer();
