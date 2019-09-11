import Sprite from "kontra/src/sprite";

import { handlePlayerInput } from "./handlePlayerInput";
import Rewind from "./Rewind";
import { createMagicPlatform } from "../entities/magicPlatform";
import { BASE_SIZE, PLATFORM_CASTING_DELAY } from "../constants";
import { delay } from "../utils/delay";
import Events from "../utils/Events";

export function createPlayer(world) {
  return Sprite({
    type: "player",
    x: 0,
    y: 0,
    color: "salmon",
    width: BASE_SIZE,
    height: BASE_SIZE,
    isOnFloor: false,
    isJumping: false,
    isRewinding: false,
    totalAmountOfMagicPlatforms: 2,
    canRewind() {
      return this.isJumping;
    },
    rewindPosition: null,
    rewinder: new Rewind(this),
    init() {
      Events.on("FLOATY_GEM_COLLECTED", () => {
        this.totalAmountOfMagicPlatforms++;
      });
    },
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
      if (!!this.rewindPosition && world.canSpawnNewMagicPlatform) {
        world.addMagicPlatform(
          createMagicPlatform(
            this.rewindPosition.x,
            this.rewindPosition.y + this.height
          )
        );

        this.rewindPosition = null;
      }
    },
    update(dt) {
      if (this.isRewinding) {
        this.rewinder.previousStep;
        const previousStep = this.rewinder.previousStep;

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

      if (this.canRewind()) {
        this.rewinder.add(this.x, this.y);
      }

      this.advance();

      if (this.isOnFloor) {
        this.rewinder.clear();
      }
    }
  });
}
