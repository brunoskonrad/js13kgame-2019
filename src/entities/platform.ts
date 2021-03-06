import Sprite from "kontra/src/sprite";
import { BASE_SIZE } from "../constants";

export function createPlatform(
  x = 0,
  y = 0,
  width = BASE_SIZE,
  height = BASE_SIZE
) {
  return Sprite({
    x,
    y,
    width,
    height,
    type: "platform",
    color: "#111"
  });
}
