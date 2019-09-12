import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo";
import World from "../world/World";
import BaseLevel from "./BaseLevel";

const LEVELS_LIST_IN_ORDER = [LevelOne, LevelTwo];

class LevelsOrder {
  private currentLevelIndex = 0;
  private levels: BaseLevel[];

  constructor(world: World) {
    this.levels = LEVELS_LIST_IN_ORDER.map(LevelClass => new LevelClass(world));
  }

  get current(): BaseLevel {
    return this.levels[this.currentLevelIndex];
  }

  get gameOver(): boolean {
    return this.levels.length - 1 === this.currentLevelIndex;
  }

  next() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
    }
  }
}

export default LevelsOrder;
