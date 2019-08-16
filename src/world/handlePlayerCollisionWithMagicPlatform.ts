export function handlePlayerCollisionWithMagicPlatform(world) {
  const collided =
    world.platforms.filter(platform =>
      detectCollisionBetweenPlayerAndPlatform(world.player, platform)
    ).length > 0;

  if (collided) {
    world.player.dy = 0;
  } else {
    world.player.dy = 5;
  }
}

function detectCollisionBetweenPlayerAndPlatform(player, platform) {
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
