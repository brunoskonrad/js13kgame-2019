export function handlePlayerCollisionWithPlatform(world) {
  const { player } = world;
  // IT SMELLS BAD
  player.isOnFloor = false;

  for (let platform of world.platforms) {
    if (platform.collidesWith(player)) {
      platform.color = "red";

      const isBelow = player.y > platform.y;

      // find out what is the direction
      if (isBelow) {
        console.log("Below");
        player.y = platform.y + player.height;
        player.dx = 0;
        player.dy = 0;
      } else {
        console.log("Above");
        player.y = platform.y - player.height + 1;
        player.isOnFloor = true;
      }

      break;
    } else {
      platform.color = "darkgray";
    }
  }
}
