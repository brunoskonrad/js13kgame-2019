import { getContext } from "kontra/src/core";

export default class Camera {
  context: CanvasRenderingContext2D;

  constructor() {
    this.context = getContext();
  }
}
