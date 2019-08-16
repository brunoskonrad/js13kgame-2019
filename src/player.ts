import { getCanvas } from "kontra/src/core";
import Sprite from "kontra/src/sprite";

const BASE_SIZE = 50;

export function createPlayer(world) {
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
    update() {
      this.advance();

      if (this.x + this.width > getCanvas().width) {
        this.dx = 0;
        this.x = getCanvas().width - this.width;
      }

      if (this.x < 0) {
        this.dx = 0;
        this.x = 0;
      }

      const collided =
        world.platforms.filter(platform =>
          checkCollisionWithPlatform(this, platform)
        ).length > 0;

      if (collided) {
        this.dy = 0;
      } else {
        this.dy = 5;
      }
    }
  });
}

function checkCollisionWithPlatform(player, platform) {
  const playerBottomY = player.y + player.height;

  if (
    playerBottomY >= platform.y &&
    playerBottomY < platform.y + 10 &&
    (player.x + player.width > platform.x &&
      player.x < platform.x + platform.width)
  ) {
    return true;
  }
}
