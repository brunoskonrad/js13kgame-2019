import BaseLevel from "./BaseLevel";
import firstMap from "../maps/first.map";

class LevelOne extends BaseLevel {
  name: string = "LevelOne";
  availableMagicPlatformsAtTheBeginning: number = 0;
  map: string = firstMap;
  levelNumber: number = 1;
}

export default LevelOne;
