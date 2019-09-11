class Timer {
  private startTime: number = 0;
  private stopTime: number = 0;

  start() {
    this.reset();
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
    if (!this.startTime) {
      return 0;
    }

    const endTime = this.stopTime || Date.now();

    return (endTime - this.startTime) / 1000;
  }

  get isRunning() {
    return !!this.startTime && !this.stopTime;
  }
}

export default new Timer();
