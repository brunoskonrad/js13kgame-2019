import Events from "../utils/Events";
import { collectionableEntity } from "./collectionable";
import { createFloatyEntity } from "./floatyEntity";

export function createCollectableMagicPlatform(x = 0, y = 0, color = "orange") {
  return createFloatyEntity({
    x,
    y,
    color,
    width: 30,
    height: 20,
    type: "collectable-magic-platform",
    ...collectionableEntity(function() {
      Events.emit("MAGIC_PLATFORM_COLLECTED");
    })
  });
}
