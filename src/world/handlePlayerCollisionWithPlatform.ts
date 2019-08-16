export function handlePlayerCollisionWithPlatform(world) {
  const { player } = world;
  // IT SMELLS BAD
  player.isOnFloor = false;

  for (let platform of world.platforms) {
    if (platform.collidesWith(player)) {
      player.isOnFloor = true;

      player.y = platform.y - player.height;
      // find out what is the direction

      break;
    }
  }
}
