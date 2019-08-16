import Sprite from "kontra/src/sprite";

const BASE_SIZE = 50;

export function createMagicPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE + BASE_SIZE / 2,
    height: BASE_SIZE,
    color: "rgba(100, 100, 100, 0.5)"
  });
}
