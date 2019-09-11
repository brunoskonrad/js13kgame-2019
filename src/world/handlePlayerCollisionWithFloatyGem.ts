import World from "./World";
import Events from "../utils/Events";

export function handlePlayerCollisionWithFloatyGem(world: World) {
  if (!world.floatyGem) {
    return;
  }

  if (world.player.collidesWith(world.floatyGem)) {
    world.floatyGem = null;
    Events.emit("FLOATY_GEM_COLLECTED");
  }
}
