import { createPlatform } from "./platform";
import { createPlayer } from "./player/player";

export default class World {
  platforms: any[];
  player: any;

  constructor() {
    this.player = createPlayer(this);
  }

  loadMap(theMap) {
    this.platforms = [];

    theMap.forEach((row, columnIndex) => {
      row.forEach((item, rowIndex) => {
        if (item === 1) {
          this.platforms.push(createPlatform(rowIndex * 50, columnIndex * 50));
        }
      });
    });
  }

  update() {
    this.player.update();
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.player.render();
  }
}
