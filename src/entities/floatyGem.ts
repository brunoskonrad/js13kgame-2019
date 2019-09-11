import Events from "../utils/Events";
import { collectionableEntity } from "./collectionable";
import { createFloatyEntity } from "./floatyEntity";

export function createFloatyGem(x = 0, y = 0, color = "purple") {
  return createFloatyEntity({
    x,
    y,
    color,
    width: 20,
    height: 20,
    type: "floaty-gem",
    ...collectionableEntity(function() {
      Events.emit("FLOATY_GEM_COLLECTED");
    })
  });
}
