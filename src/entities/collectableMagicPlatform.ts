import Events from "../utils/Events";
import { collectableEntity } from "./collectable";
import { createFloatyEntity } from "./floatyEntity";

export function createCollectableMagicPlatform(x = 0, y = 0, color = "orange") {
  return createFloatyEntity({
    x,
    y,
    color,
    width: 30,
    height: 20,
    type: "collectable-magic-platform",
    ...collectableEntity(function() {
      Events.emit("MAGIC_PLATFORM_COLLECTED");
    })
  });
}
