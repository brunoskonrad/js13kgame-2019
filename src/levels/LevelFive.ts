import BaseLevel from "./BaseLevel";
import secondMap from "../maps/fifth.map";

class LevelFive extends BaseLevel {
  name: string = "LevelFive";
  availableMagicPlatformsAtTheBeginning: number = 2;
  map: string = secondMap;
  levelNumber: number = 5;
}

export default LevelFive;
