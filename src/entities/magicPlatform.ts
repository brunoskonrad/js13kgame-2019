import Sprite from "kontra/src/sprite";

import { BASE_SIZE, PLATFORM_DURATION } from "../constants";
import Events from "../utils/Events";

export function createMagicPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE + BASE_SIZE / 2,
    height: BASE_SIZE,
    color: "rgba(17, 17, 17, 1)",
    exists: true,
    eventEmitted: false,
    displayTime: Date.now(),
    update() {
      const visibleSince = Date.now() - this.displayTime;
      this.exists = visibleSince < PLATFORM_DURATION;

      if (this.exists) {
        const opacity = (100 - (100 * visibleSince) / PLATFORM_DURATION) / 100;
        this.color = `rgba(17, 17, 17, ${opacity})`;
      }

      if (!this.exists && !this.eventEmitted) {
        Events.emit("MAGIC_PLATFORM_GONE");
      }
    }
  });
}
