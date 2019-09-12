import BaseLevel from "./BaseLevel";
import secondMap from "../maps/sixth.map";

class LevelSix extends BaseLevel {
  name: string = "LevelSix";
  availableMagicPlatformsAtTheBeginning: number = 2;
  map: string = secondMap;
  levelNumber: number = 6;
}

export default LevelSix;
