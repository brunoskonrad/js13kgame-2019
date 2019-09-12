import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo";
import World from "../world/World";
import BaseLevel from "./BaseLevel";
import LevelThree from "./LevelThree";
import LevelFour from "./LevelFour";
import LevelFive from "./LevelFive";

const LEVELS_LIST_IN_ORDER = [
  LevelOne,
  LevelTwo,
  LevelThree,
  LevelFour,
  LevelFive
];

class LevelsOrder {
  private currentLevelIndex = 0;
  levels: BaseLevel[];

  constructor(world: World) {
    this.levels = LEVELS_LIST_IN_ORDER.map(LevelClass => new LevelClass(world));
  }

  get current(): BaseLevel {
    return this.levels[this.currentLevelIndex];
  }

  get isLastLevel() {
    return this.levels.length - 1 === this.currentLevelIndex;
  }

  next() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
    }
  }

  setLevel(level: number) {
    const index = level - 1;

    if (this.levels.length > index) {
      this.currentLevelIndex = index;
    } else {
      this.currentLevelIndex = this.levels.length - 1;
    }
  }
}

export default LevelsOrder;
