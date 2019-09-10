import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";
import Rewind from "./Rewind";
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
    isRewinding: false,
    rewindPosition: null,
    rewinder: new Rewind(this),
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

        this.rewinder.clear();
      }
    },
    rewind: delay(function() {
      if (this.rewinder.hasSteps && !this.isRewinding) {
        this.isRewinding = true;
        this.rewindPosition = this.rewinder.lastStep.position;
      }
    }, PLATFORM_CASTING_DELAY),
    createMagicPlatform() {
      if (this.rewindPosition) {
        world.addMagicPlatform(
          createMagicPlatform(this.rewindPosition.x, this.rewindPosition.y + this.height)
        );

        this.rewindPosition = null;
      }
    },
    update(dt) {
      if (this.isRewinding) {
        const previousStep = this.rewinder.previousStep

        if (previousStep) {
          this.x = previousStep.position.x;
          this.y = previousStep.position.y;  

          this.advance();
          return;
        }

        this.createMagicPlatform();
        this.isRewinding = false;
      }

      handlePlayerInput(this);

      if (this.isJumping) {
        this.rewinder.add(this.x, this.y);
      }

      this.advance();

      if (this.isOnFloor) {
        this.rewinder.clear();
      }
    },
  });
}
