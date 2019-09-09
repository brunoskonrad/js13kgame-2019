import Sprite from "kontra/src/sprite";
import { BASE_SIZE, PLATFORM_DURATION } from "./constants";

export function createMagicPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE + BASE_SIZE / 2,
    height: BASE_SIZE,
    color: "rgba(100, 100, 100, 1)",
    exists: true,
    displayTime: Date.now(),
    update() {
      const visibleSince = Date.now() - this.displayTime;
      this.exists = visibleSince < PLATFORM_DURATION;

      if (this.exists) {
        const opacity = (100 - (100 * visibleSince) / PLATFORM_DURATION) / 100;
        this.color = `rgba(100, 100, 100, ${opacity})`;
      }
    }
  });
}
