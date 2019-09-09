import Sprite from "kontra/src/sprite";
import { BASE_SIZE } from "./constants";

BASE_SIZE;

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
    color: "darkgray",
    leftCollisionTimeout: null,
    leftCollision() {
      if (!this.leftCollisionTimeout) {
        this.color = "green";
        this.leftCollisionTimeout = setTimeout(() => {
          this.color = "darkgray";
          this.leftCollisionTimeout = null;
        }, 2000);
      }
    },
    rightCollisionTimeout: null,
    rightCollision() {
      if (!this.rightCollisionTimeout) {
        this.color = "yellow";
        this.rightCollisionTimeout = setTimeout(() => {
          this.color = "darkgray";
          this.rightCollisionTimeout = null;
        }, 2000);
      }
    }
  });
}
