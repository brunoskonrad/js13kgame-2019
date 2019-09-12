import BaseLevel from "./BaseLevel";
import secondMap from "../maps/third.map";

class LevelThree extends BaseLevel {
  name: string = "LevelThree";
  availableMagicPlatformsAtTheBeginning: number = 2;
  map: string = secondMap;
  levelNumber: number = 3;
}

export default LevelThree;
