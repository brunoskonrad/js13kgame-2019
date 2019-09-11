import { getCanvas } from "kontra/src/core";
import GameLoop from "kontra/src/gameLoop";

import firstMap from "./maps/first.map";
import World from "./world/World";
import Events from "./utils/Events";
import Menu from "./menu";
import Timer from "./utils/Timer";

export default class Game {
  world: World = new World(this);
  menu: Menu = new Menu();
  gameLoop: any;

  gameIsRunning: boolean = false;

  constructor() {
    this.menu.render();

    Events.on("START_GAME", this.start);
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

    const { world } = this;
    this.world.loadMap(firstMap);

    if (!this.gameLoop) {
      this.gameLoop = GameLoop({
        update: function(d) {
          world.update(d);
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
    this.world.loadMap(firstMap);
    this.start();
  };

  renderGame() {
    getCanvas().classList.remove("hidden");
    this.menu.hide();
  }

  renderMenu() {
    getCanvas().classList.add("hidden");
  }
}
