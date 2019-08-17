import { keyPressed } from "kontra/src/keyboard";

export function handlePlayerInput(player) {
  if (keyPressed("space")) {
    player.jump();
  }

  if (keyPressed("right")) {
    player.moveRight();
  }

  if (keyPressed("left")) {
    player.moveLeft();
  }

  if (
    (!keyPressed("left") && !keyPressed("right")) ||
    (keyPressed("left") && keyPressed("right"))
  ) {
    player.dx = 0;
  }

  if (keyPressed("shift") && player.isJumping) {
    if (player.rewind.hasSteps) {
      player.x = player.rewind.steps[0].position.x;
      player.y = player.rewind.steps[0].position.y;

      player.createMagicPlatform();
    }
  }
}
