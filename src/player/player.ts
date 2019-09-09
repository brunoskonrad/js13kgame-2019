import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";
import Rewind from "../Rewind";
import { createMagicPlatform } from "../magicPlatform";
import { BASE_SIZE, PLATFORM_CASTING_DELAY } from "../constants";
import { delay } from "../utils/delay";

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
    rewinder: new Rewind(),
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
    rewind: delay(function() {
      if (this.rewinder.hasSteps) {
        const { position } = this.rewinder.firstStep;

        this.x = position.x;
        this.y = position.y;
        this.createMagicPlatform();
      }
    }, PLATFORM_CASTING_DELAY),
    createMagicPlatform() {
      if (this.rewinder.hasSteps) {
        const { position } = this.rewinder.lastStep;

        world.addMagicPlatform(
          createMagicPlatform(position.x, position.y + this.height)
        );
      }
    },
    update(dt) {
      handlePlayerInput(this);

      if (this.isJumping) {
        this.rewinder.add(this.x, this.y);
      }

      this.advance();

      if (this.isOnFloor) {
        this.rewinder.clear();
      }
    }
  });
}
