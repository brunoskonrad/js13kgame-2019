import { getCanvas } from "kontra/src/core";
import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";

const BASE_SIZE = 50;

export function createPlayer() {
  return Sprite({
    type: "player",
    x: 350,
    y: 600,
    color: "salmon",
    width: BASE_SIZE,
    height: BASE_SIZE,
    dy: 5,
    moveRight() {
      this.dx = 5;
    },
    moveLeft() {
      this.dx = -5;
    },
    jump() {
      this.dy = -5;
    },
    update() {
      handlePlayerInput(this);
      this.advance();
    }
  });
}
