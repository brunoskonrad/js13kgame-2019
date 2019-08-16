import { createPlatform } from "../platform";
import { createPlayer } from "../player/player";

import { handlePlayerCollisionWithPlatform } from "./handlePlayerCollisionWithPlatform";
import { handlePlayerCollisionWithBorders } from "./handlePlayerCollisionWithBorders";
import { parseMap, parsePlatforms } from "../mapParser";

const GRAVITY = 10;

export default class World {
  platforms: any[];
  player: any;

  constructor() {
    this.player = createPlayer();
  }

  loadMap(theMap) {
    const pieces = parseMap(theMap);

    this.platforms = parsePlatforms(pieces);
  }

  update(dt) {
    this.player.update(dt);

    if (!this.player.isOnFloor) {
      this.player.dy += GRAVITY * dt;
    } else {
      this.player.dy = 0;
    }

    handlePlayerCollisionWithPlatform(this);
    handlePlayerCollisionWithBorders(this);
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.player.render();
  }
}
