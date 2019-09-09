import { getCanvas } from "kontra/src/core";
import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";
import Rewind from "../Rewind";
import { createMagicPlatform } from "../magicPlatform";
import { BASE_SIZE } from "../constants";

export function createPlayer(world) {
  return Sprite({
    type: "player",
    x: 0,
    y: 0,
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
        this.dy = -8;
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

      if (this.isJumping) {
        this.rewind.add(this.x, this.y);
      }

      this.advance();

      if (this.isOnFloor) {
        this.rewind.clear();
      }
    }
  });
}
