import World from "./World";

export function handlePlayerCollisionWithCollectables(world: World) {
  for (let collectableElement of world.collectableElements) {
    if (world.player.collidesWith(collectableElement)) {
      collectableElement.collect();
    }
  }
}
