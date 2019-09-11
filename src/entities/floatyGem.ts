import Events from "../utils/Events";
import { collectableEntity } from "./collectable";
import { createFloatyEntity } from "./floatyEntity";

export function createFloatyGem(x = 0, y = 0, color = "purple") {
  return createFloatyEntity({
    x,
    y,
    color,
    width: 20,
    height: 20,
    type: "floaty-gem",
    ...collectableEntity(function() {
      Events.emit("FLOATY_GEM_COLLECTED");
    })
  });
}
