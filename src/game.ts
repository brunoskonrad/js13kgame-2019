import { getCanvas } from "kontra/src/core";
import GameLoop from "kontra/src/gameLoop";

import World from "./world/World";
import Events from "./utils/Events";
import Menu from "./menu";
import Timer from "./utils/Timer";
import GameUI from "./ui";
import LevelsOrder from "./levels/LevelsOrder";

export default class Game {
  world: World = new World(this);
  menu: Menu = new Menu();
  ui: GameUI = new GameUI();
  levels: LevelsOrder = new LevelsOrder(this.world);
  gameLoop: any;

  gameIsRunning: boolean = false;

  constructor() {
    this.menu.render();

    this.ui.availablePlatforms = this.world.player.totalAmountOfMagicPlatforms;

    Events.on("START_GAME", this.start);
    Events.on("RESTART_LEVEL", this.restartLevel);
    Events.on("NEXT_LEVEL", this.nextLevel);

    document.addEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.which === 13) {
      this.restartLevel();
    }
  };

  start = () => {
    if (this.gameIsRunning) {
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

  renderGame() {
    getCanvas().classList.remove("hidden");
    this.updateGameUI();
    this.menu.hide();
  }

  renderMenu() {
    getCanvas().classList.add("hidden");
  }

  updateGameUI() {
    this.ui.availablePlatforms = this.world.player.totalAmountOfMagicPlatforms;
    this.ui.usedPlatforms = 0;
  }
}
