import Events from "./utils/Events";

class GameUI {
  private menuButton = document.querySelector("[data-open-menu]");
  private currentTimeElement = document.querySelector("[data-current-seconds]");
  private usedPlatformsElement = document.querySelector(
    "[data-used-platforms]"
  );
  private availablePlatformsElement = document.querySelector(
    "[data-available-platforms]"
  );

  constructor() {
    this.menuButton.addEventListener("click", this.openMenu);
  }

  openMenu = () => {
    Events.emit("OPEN_GAME_MENU");
  };

  set seconds(seconds: number) {
    this.currentTimeElement.innerHTML = seconds.toFixed(2);
  }

  set usedPlatforms(usedPlatforms: number) {
    this.usedPlatformsElement.innerHTML = `${usedPlatforms}`;
  }

  set availablePlatforms(availablePlatforms: number) {
    this.availablePlatformsElement.innerHTML = `${availablePlatforms}`;
  }
}

export default GameUI;
