import BaseLevel from "../levels/BaseLevel";
import { gameStorage } from "./GameStorage";

type HighscoreObject = { [key: number]: number };

class Highscore {
  data: HighscoreObject = {};

  constructor() {
    this.data = gameStorage.getItem("highscore") || {};
  }

  setHighscore(level: BaseLevel, newTime: number) {
    if (
      this.data[level.levelNumber] &&
      this.data[level.levelNumber] < newTime
    ) {
      return;
    }

    this.data[level.levelNumber] = newTime;
    this.save();
  }

  getHighscore(level: BaseLevel) {
    return this.data[level.levelNumber];
  }

  save() {
    gameStorage.setItem("highscore", this.data);
  }

  get completedLevels() {
    return Object.keys(this.data);
  }
}

export default Highscore;
