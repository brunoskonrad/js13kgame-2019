import { getCanvas } from "kontra/src/core";
import GameLoop from "kontra/src/gameLoop";

import World from "./world/World";
import Events from "./utils/Events";
import Menu from "./menu";
import Timer from "./utils/Timer";
import GameUI from "./ui";
import LevelsOrder from "./levels/LevelsOrder";
import Highscore from "./utils/Highscore";

export default class Game {
  world: World = new World(this);
  menu: Menu;
  ui: GameUI = new GameUI();
  levels: LevelsOrder = new LevelsOrder(this.world);
  gameLoop: any;
  highscore: Highscore = new Highscore();

  gameIsRunning: boolean = false;

  constructor() {
    this.menu = new Menu(this);
    this.menu.render();

    this.levels.setLevel(this.highscore.lastSavedLevel + 1);

    this.ui.availablePlatforms = this.world.player.totalAmountOfMagicPlatforms;

    Events.on("START_GAME", this.start);
    Events.on("RESTART_LEVEL", this.restartLevel);
    Events.on("NEXT_LEVEL", this.nextLevel);
    Events.on("FLOATY_GEM_COLLECTED", this.endLevel);
    Events.on("OPEN_GAME_MENU", this.openGameMenu);
    Events.on("LOAD_LEVEL", level => {
      this.levels.setLevel(level);
      this.start();
    });

    document.addEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.which === 13) {
      this.restartLevel();
    }
  };

  get listOfLevels() {
    const listOfCompletedLevels = this.highscore.completedLevels;

    return this.levels.levels.map(level => ({
      levelNumber: level.levelNumber,
      isCompleted: listOfCompletedLevels.includes(level.levelNumber)
    }));
  }

  start = () => {
    if (this.gameIsRunning) {
      this.renderGame();
      return;
    }

    this.gameIsRunning = true;

    const { world, ui } = this;
    this.levels.current.start();

    if (!this.gameLoop) {
      this.gameLoop = GameLoop({
        update: function(d) {
          world.update(d);

          if (Timer.isRunning) {
            ui.seconds = Timer.ellapseTime;
          }
        },
        render: function() {
          world.render();
        }
      });
    }

    this.gameLoop.start();
    this.renderGame();
    Timer.start();
  };

  stop = () => {
    this.gameIsRunning = false;
    if (this.gameLoop) {
      this.gameLoop.stop();
    }
  };

  restartLevel = () => {
    this.stop();
    this.levels.current.start();
    this.start();
  };

  nextLevel = () => {
    this.stop();
    this.levels.next();
    this.levels.current.start();
    this.start();
  };

  endLevel = () => {
    Timer.stop();
    this.highscore.setHighscore(this.levels.current, Timer.ellapseTime);

    this.menu.state = "game-score";
    this.menu.render();
  };

  renderGame() {
    getCanvas().classList.remove("hidden");
    this.updateGameUI();
    this.menu.hide();
  }

  updateGameUI() {
    this.ui.availablePlatforms = this.world.player.totalAmountOfMagicPlatforms;
    this.ui.usedPlatforms = 0;
  }

  openGameMenu = () => {
    this.menu.state = "game-instructions";
    this.menu.render();
  };
}
