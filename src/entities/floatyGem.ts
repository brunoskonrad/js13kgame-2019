import Sprite from "kontra/src/sprite";

const TIME_TO_CHANGE = 400;

export function createFloatyGem(
  x = 0,
  y = 0,
  color = 'purple',
) {
  return Sprite({
    x,
    y,
    color,
    width: 20,
    height: 20,
    type: "floaty-gem",
    start: Date.now(),
    dy: 0.13,
    update() {
      this.advance();
      if (Date.now() - this.start > TIME_TO_CHANGE) {
        this.dy = this.dy * -1;
        this.start = Date.now();
      }
    }
  });
}
