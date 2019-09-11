import Events from "./utils/Events";
import Timer from "./utils/Timer";

type MenuState = "game-instructions" | "game-score";

class Menu {
  menuElement = document.querySelector("[data-game-menu]");
  state: MenuState = "game-instructions";
  isVisible: boolean = true;

  constructor() {
    this.menuElement.addEventListener("click", this.clickMenu);
  }

  clickMenu = () => {
    if (this.isVisible) {
      Events.emit("RETURN_TO_GAME");
    }
  };

  hide() {
    this.menuElement.classList.add("hidden");
    this.isVisible = false;
  }

  display() {
    this.menuElement.classList.remove("hidden");
    this.isVisible = true;

    switch (this.state) {
      case "game-instructions": {
        document.querySelector(".game-instructions").classList.remove("none");
        document.querySelector(".game-score").classList.add("none");
        break;
      }
      case "game-score": {
        document.querySelector(".game-instructions").classList.add("none");
        document.querySelector(".game-score").classList.remove("none");

        document.querySelector("[data-level-duration]").innerHTML =
          Timer.ellapseTime + "";
        break;
      }
    }
  }
}

export default Menu;
