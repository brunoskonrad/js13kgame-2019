class GameUI {
  private currentTimeElement = document.querySelector("[data-current-seconds]");
  private usedPlatformsElement = document.querySelector(
    "[data-used-platforms]"
  );
  private availablePlatformsElement = document.querySelector(
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
