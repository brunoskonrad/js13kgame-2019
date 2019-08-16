import Sprite from "kontra/src/sprite";

export function createPlatform(x = 0, y = 0, width = 50, height = 50) {
  return Sprite({
    x,
    y,
    width,
    height,
    type: "platform",
    color: "darkgray"
  });
}
