import { createPlatform } from "../platform";
import { createPlayer } from "../player/player";

import { handlePlayerCollisionWithPlatform } from "./handlePlayerCollisionWithPlatform";
import { handlePlayerCollisionWithBorders } from "./handlePlayerCollisionWithBorders";

export default class World {
  platforms: any[];
  player: any;

  constructor() {
    this.player = createPlayer();
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
    handlePlayerCollisionWithPlatform(this);
    handlePlayerCollisionWithBorders(this);
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.player.render();
  }
}
