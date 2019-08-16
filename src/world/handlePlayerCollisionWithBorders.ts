import { getCanvas } from "kontra/src/core";

import World from "./World";

export function handlePlayerCollisionWithBorders(world: World) {
  if (world.player.x + world.player.width > getCanvas().width) {
    world.player.dx = 0;
    world.player.x = getCanvas().width - world.player.width;
  }

  if (world.player.x < 0) {
    world.player.dx = 0;
    world.player.x = 0;
  }
}
