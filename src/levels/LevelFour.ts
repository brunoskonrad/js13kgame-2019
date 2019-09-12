import BaseLevel from "./BaseLevel";
import secondMap from "../maps/fourth.map";

class LevelFour extends BaseLevel {
  name: string = "LevelFour";
  availableMagicPlatformsAtTheBeginning: number = 2;
  map: string = secondMap;
  levelNumber: number = 4;
}

export default LevelFour;
