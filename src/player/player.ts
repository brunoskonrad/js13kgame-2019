import { getCanvas } from "kontra/src/core";
import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";
import Rewind from "../Rewind";
import { createMagicPlatform } from "../magicPlatform";

const BASE_SIZE = 50;

export function createPlayer(world) {
  return Sprite({
    type: "player",
    x: 9999,
    y: 9999,
    color: "salmon",
    width: BASE_SIZE,
    height: BASE_SIZE,
    dy: 5,
    isOnFloor: false,
    isJumping: false,
    rewind: new Rewind(),
    moveRight() {
      this.dx = 5;
    },
    moveLeft() {
      this.dx = -5;
    },
    jump() {
      if (this.isOnFloor && !this.isJumping) {
        this.isOnFloor = false;
        this.isJumping = true;
        this.dy = -13;
      }
    },
    createMagicPlatform() {
      if (this.rewind.hasSteps) {
        const { position } = this.rewind.lastStep;

        world.addMagicPlatform(createMagicPlatform(position.x, position.y));
      }
    },
    update(dt) {
      handlePlayerInput(this);
      this.advance();

      if (this.isJumping) {
        this.rewind.add(this.x, this.y);
      }

      if (this.isOnFloor) {
        this.rewind.clear();
      }
    }
  });
}
