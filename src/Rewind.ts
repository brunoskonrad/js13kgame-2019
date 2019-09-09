import Vector from "kontra/src/vector";

interface RewindStep {
  position: any;
}

export default class Rewind {
  steps: RewindStep[] = [];

  clear() {
    this.steps = [];
  }

  add(x, y) {
    this.steps.push({
      position: Vector(x, y)
    });
  }

  get hasSteps() {
    return this.steps.length > 0;
  }

  get firstStep(): RewindStep {
    return this.steps[0];
  }

  get lastStep(): RewindStep {
    return this.steps[this.steps.length - 1];
  }
}
