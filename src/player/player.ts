import { getCanvas } from "kontra/src/core";
import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";

const BASE_SIZE = 50;

export function createPlayer() {
  return Sprite({
    type: "player",
    x: 350,
    y: 300,
    color: "salmon",
    width: BASE_SIZE,
    height: BASE_SIZE,
    dy: 5,
    isOnFloor: false,
    isJumping: false,
    moveRight() {
      this.dx = 5;
    },
    moveLeft() {
      this.dx = -5;
    },
    jump() {
      if (!this.isJumping) {
        this.isOnFloor = false;
        this.isJumping = true;
        this.dy = -7.5;
      }
    },
    update(dt) {
      handlePlayerInput(this);
      this.advance();
    }
  });
}
