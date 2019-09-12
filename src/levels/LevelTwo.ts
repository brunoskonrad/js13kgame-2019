import BaseLevel from "./BaseLevel";
import secondMap from "../maps/second.map";

class LevelTwo extends BaseLevel {
  name: string = "LevelTwo";
  availableMagicPlatformsAtTheBeginning: number = 1;
  map: string = secondMap;
}

export default LevelTwo;
