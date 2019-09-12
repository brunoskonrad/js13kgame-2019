import Events from "./utils/Events";
import Timer from "./utils/Timer";

type MenuState = "game-instructions" | "game-score";

class Menu {
  menuElement = document.querySelector("[data-game-menu]");
  internalState: MenuState = "game-instructions";
  menuComponent: MenuComponent = new GameInfoMenu();
  isVisible: boolean = true;

  constructor() {
    this.menuComponent.init();
  }

  get state() {
    return this.internalState;
  }

  set state(nextState: MenuState) {
    if (nextState === this.internalState) {
      return;
    }

    this.internalState = nextState;
    this.menuComponent.tearDown();

    if (nextState === "game-instructions") {
      this.menuComponent = new GameInfoMenu();
    }
    if (nextState === "game-score") {
      this.menuComponent = new AfterLevelMenu();
    }

    this.menuComponent.init();
  }

  hide() {
    this.menuElement.classList.add("hidden");
    this.isVisible = false;
    this.menuComponent.tearDown();
  }

  render() {
    this.menuElement.classList.remove("hidden");
    this.isVisible = true;

    this.menuComponent.init();
    this.menuComponent.render();
  }
}

interface MenuComponent {
  init(): void;
  render(): void;
  tearDown(): void;
}

class GameInfoMenu implements MenuComponent {
  mounted: boolean = false;

  gameInstructionsElement = document.querySelector(".game-instructions");
  button = document.querySelector("[data-start-game-button]");

  init() {
    if (this.mounted) {
      return;
    }

    this.button.addEventListener("click", this.onStartButtonClick);
    document.addEventListener("keypress", this.onSpaceBarPressDown);
    this.mounted = true;
  }

  onSpaceBarPressDown = event => {
    if (event.which === 32) {
      this.onStartButtonClick();
    }
  };

  onStartButtonClick = () => {
    Events.emit("START_GAME");
  };

  render() {
    this.gameInstructionsElement.classList.remove("none");
  }

  tearDown() {
    this.button.removeEventListener("click", this.onStartButtonClick);
    document.removeEventListener("keypress", this.onSpaceBarPressDown);

    this.gameInstructionsElement.classList.add("none");
    this.mounted = false;
  }
}

class AfterLevelMenu implements MenuComponent {
  gameScoreElement = document.querySelector(".game-score");
  restartButton = document.querySelector("[data-restart-level-button]");
  nextLevelButton = document.querySelector("[data-next-level-button]");

  init() {
    this.restartButton.addEventListener("click", this.restart);
    this.nextLevelButton.addEventListener("click", this.nextLevel);

    document.addEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.which === 32) {
      this.nextLevel();
    }
  };

  restart = () => {
    Events.emit("RESTART_LEVEL");
  };

  nextLevel = () => {
    Events.emit("NEXT_LEVEL");
  };

  render() {
    this.gameScoreElement.classList.remove("none");

    document.querySelector(
      "[data-level-duration]"
    ).innerHTML = Timer.ellapseTime.toFixed(2);
  }

  tearDown() {
    this.gameScoreElement.classList.add("none");

    this.restartButton.removeEventListener("click", this.restart);
    this.nextLevelButton.removeEventListener("click", this.nextLevel);
    document.removeEventListener("keypress", this.handleKeyPress);
  }
}

export default Menu;
