import Sprite from "kontra/src/sprite";
import { emit } from "kontra/src/events";

import {
  BASE_SIZE,
  PLATFORM_DURATION,
  GAME_EVENT_MAGIC_PLATFORM_GONE
} from "./constants";

export function createMagicPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE + BASE_SIZE / 2,
    height: BASE_SIZE,
    color: "rgba(100, 100, 100, 1)",
    exists: true,
    eventEmitted: false,
    displayTime: Date.now(),
    update() {
      const visibleSince = Date.now() - this.displayTime;
      this.exists = visibleSince < PLATFORM_DURATION;

      if (this.exists) {
        const opacity = (100 - (100 * visibleSince) / PLATFORM_DURATION) / 100;
        this.color = `rgba(100, 100, 100, ${opacity})`;
      }

      if (!this.exists && !this.eventEmitted) {
        emit(GAME_EVENT_MAGIC_PLATFORM_GONE);
      }
    }
  });
}
