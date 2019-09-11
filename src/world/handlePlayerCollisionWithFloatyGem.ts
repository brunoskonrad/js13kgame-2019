import World from "./World";

export function handlePlayerCollisionWithFloatyGem(world: World) {
  if (!world.floatyGem) {
    return;
  }

  if (world.player.collidesWith(world.floatyGem)) {
    world.floatyGem = null;
  }
}
