import Events from "./utils/Events";
import Timer from "./utils/Timer";
import Game from "./game";

type MenuState = "game-instructions" | "game-score";

class Menu {
  game: Game;
  menuElement = document.querySelector("[data-game-menu]");
  internalState: MenuState = "game-instructions";
  menuComponent: MenuComponent = new GameInfoMenu();
  isVisible: boolean = true;

  constructor(game: Game) {
    this.game = game;
    this.menuComponent.init(game);
  }

  get state() {
    return this.internalState;
  }

  set state(nextState: MenuState) {
    this.internalState = nextState;
    this.menuComponent.tearDown();

    if (nextState === "game-instructions") {
      this.menuComponent = new GameInfoMenu();
    }
    if (nextState === "game-score") {
      this.menuComponent = new AfterLevelMenu();
    }

    this.menuComponent.init(this.game);
  }

  hide() {
    this.menuElement.classList.add("hidden");
    this.isVisible = false;
    this.menuComponent.tearDown();
  }

  render() {
    this.menuElement.classList.remove("hidden");
    this.isVisible = true;

    this.menuComponent.init(this.game);
    this.menuComponent.render();
  }
}

interface MenuComponent {
  init(game: Game): void;
  render(): void;
  tearDown(): void;
}

class GameInfoMenu implements MenuComponent {
  mounted: boolean = false;

  gameInstructionsElement = document.querySelector(".game-instructions");
  button = document.querySelector("[data-start-game-button]");
  levelsListContainer = document.querySelector("[data-levels-container]");
  levelsList = document.querySelector("[data-levels-list]");
  highscoreContainer = document.querySelector("[data-highscore-menu]");

  init(game: Game) {
    if (this.mounted) {
      return;
    }

    const { listOfLevels, isGameOver } = game;

    if (!isGameOver) {
      this.button.addEventListener("click", this.onStartButtonClick);
      document.addEventListener("keypress", this.onSpaceBarPressDown);
    }

    if (listOfLevels.find(level => level.isCompleted)) {
      this.levelsList.innerHTML = "";
      this.highscoreContainer.innerHTML = "";

      listOfLevels
        .filter(level => level.isCompleted)
        .forEach(level => {
          const button = document.createElement("button");

          button.innerHTML = level.levelNumber.toString();
          button.classList.add("button-small");
          button.dataset["level"] = level.levelNumber.toString();

          this.levelsList.appendChild(button);

          const highscoreLine = document.createElement("li");
          highscoreLine.innerHTML = `<strong>Level ${
            level.levelNumber
          }</strong>: ${level.highscore.toFixed(2)} seconds`;
          this.highscoreContainer.appendChild(highscoreLine);
        });

      this.levelsListContainer.classList.remove("none");
      this.highscoreContainer.classList.remove("none");
      document.querySelector("[data-highscore-label]").classList.remove("none");
      this.button.innerHTML = "Continue";

      this.levelsList.addEventListener("click", this.onLevelClick);
    }

    if (isGameOver) {
      document.querySelector("[data-start-game-info]").classList.add("none");
    }

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

  onLevelClick = event => {
    const { level } = event.target.dataset;

    if (level) {
      Events.emit("LOAD_LEVEL", level);
    }
  };

  render() {
    this.gameInstructionsElement.classList.remove("none");
  }

  tearDown() {
    this.button.removeEventListener("click", this.onStartButtonClick);
    document.removeEventListener("keypress", this.onSpaceBarPressDown);
    this.levelsList.removeEventListener("click", this.onLevelClick);

    this.gameInstructionsElement.classList.add("none");
    this.mounted = false;
  }
}

class AfterLevelMenu implements MenuComponent {
  game: Game;

  gameScoreElement = document.querySelector(".game-score");
  scoreMessageElement = document.querySelector("[data-level-message]");
  restartButton = document.querySelector("[data-restart-level-button]");
  nextLevelButton = document.querySelector("[data-next-level-button]");

  init(game: Game) {
    this.game = game;

    this.restartButton.addEventListener("click", this.restart);
    if (this.game.levels.isLastLevel) {
      this.nextLevelButton.classList.add("none");
    } else {
      this.nextLevelButton.addEventListener("click", this.nextLevel);
    }

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

    const highscore = this.game.highscore.getHighscore(
      this.game.levels.current
    );

    if (Timer.ellapseTime > highscore) {
      this.scoreMessageElement.innerHTML = `Not this time! Your highscore is <strong>${highscore.toFixed(
        2
      )}</strong>.`;
    } else {
      this.scoreMessageElement.innerHTML = `🎉 Congrats on your new highscore! ☝️`;
    }

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
