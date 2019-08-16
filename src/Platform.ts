import Sprite from "kontra/src/sprite";
import GameObject from "./GameObject";

const BASE_SIZE = 50;

export default class Platform extends GameObject {
  constructor(x: number = 0, y: number = 0) {
    super(
      Sprite({
        x,
        y,
        type: "platform",
        width: BASE_SIZE,
        height: BASE_SIZE,
        color: "darkgray"
      })
    );
  }
}
