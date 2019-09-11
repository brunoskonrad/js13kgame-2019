import Events from "./utils/Events";

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

export default Menu;
