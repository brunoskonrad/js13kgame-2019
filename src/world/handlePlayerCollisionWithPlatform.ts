export function handlePlayerCollisionWithPlatform(world) {
  const { player } = world;

  player.isOnFloor = false;

  for (let platform of world.platforms) {
    if (platform.collidesWith(player)) {
      const isBelow = player.y > platform.y;
      const didCollideLeft =
        (platform.x === player.x + player.width ||
          platform.x > player.x + player.width - 10) &&
        (player.y > platform.y ||
          player.y + player.height < platform.y + platform.y) &&
        player.dx !== 0;

      const didCollideRight =
        (platform.x + platform.width === player.x ||
          platform.x + platform.width - 10 < player.x) &&
        (player.y > platform.y ||
          player.y + player.height < platform.y + platform.y) &&
        player.dx !== 0;

      if (didCollideLeft) {
        platform.leftCollision();
        player.x = platform.x;
        player.dx = player.dx * -1;
        break;
      }

      if (didCollideRight) {
        platform.rightCollision();
        player.x = platform.x + platform.width;
        player.dx = player.dx * -1;
        break;
      }

      // find out what is the direction
      if (isBelow) {
        // console.log("Below");
        player.y = platform.y + player.height;
        player.dx = 0;
        player.dy = 0;
      } else {
        // console.log("Above");
        player.y = platform.y - player.height;
        player.isOnFloor = true;
        player.isJumping = false;
      }

      break;
    }
  }
}
