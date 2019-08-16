import Sprite from "kontra/src/sprite";
import GameObject from "./GameObject";

const BASE_SIZE = 50;

export function createPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE,
    height: BASE_SIZE,
    color: "darkgray"
  });
}
