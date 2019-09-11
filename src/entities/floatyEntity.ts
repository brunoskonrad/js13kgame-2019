import Sprite from "kontra/src/sprite";

const TIME_TO_CHANGE = 400;

export function createFloatyEntity(props: any) {
  const { timeToChange = TIME_TO_CHANGE } = props;

  return Sprite({
    ...props,
    start: Date.now(),
    dy: 0.13,
    update() {
      this.advance();
      if (Date.now() - this.start > timeToChange) {
        this.dy = this.dy * -1;
        this.start = Date.now();
      }
    }
  });
}
