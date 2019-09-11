import { getCanvas } from "kontra/src/core";
import GameLoop from "kontra/src/gameLoop";

import firstMap from "./maps/first.map";
import World from "./world/World";
import Events from "./utils/Events";
import Menu from "./menu";

export default class Game {
  world: World = new World();
  menu: Menu = new Menu();

  gameIsRunning: boolean = false;

  constructor() {
    this.menu.display();

    Events.on("RETURN_TO_GAME", this.start);
  }

  start = () => {
    if (this.gameIsRunning) {
      return;
    }

    this.gameIsRunning = true;

    const { world } = this;
    this.world.loadMap(firstMap);

    const game = GameLoop({
      update: function(d) {
        world.update(d);
      },
      render: function() {
        world.render();
      }
    });

    game.start();
    this.renderGame();
  };

  renderGame() {
    getCanvas().classList.remove("hidden");
    this.menu.hide();
  }

  renderMenu() {
    getCanvas().classList.add("hidden");
  }
}
