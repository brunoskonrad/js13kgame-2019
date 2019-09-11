import Events from "./utils/Events";

class GameUI {
  currentTimeElement = document.querySelector("[data-current-seconds]");
  usedPlatformsElement = document.querySelector("[data-used-platforms]");
  availablePlatformsElement = document.querySelector(
    "[data-available-platforms]"
  );

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
