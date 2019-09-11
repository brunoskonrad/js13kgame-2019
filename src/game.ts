import { getCanvas } from "kontra/src/core";
import GameLoop from "kontra/src/gameLoop";

import firstMap from "./maps/first.map";
import World from "./world/World";
import Events from "./utils/Events";

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

type MenuState = "game-instructions" | "game-score";

class Menu {
  menuElement = document.querySelector("[data-game-menu]");
  state: MenuState = "game-instructions";

  constructor() {
    this.menuElement.addEventListener("click", this.clickMenu);
  }

  clickMenu = () => {
    Events.emit("RETURN_TO_GAME");
  };

  hide() {
    this.menuElement.classList.add("hidden");
  }

  display() {
    switch (this.state) {
      case "game-instructions": {
        document.querySelector(".game-instructions").classList.remove("none");
      }
    }
  }
}
