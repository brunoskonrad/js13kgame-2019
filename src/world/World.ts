import { createPlatform } from "../platform";
import { createPlayer } from "../player/player";

import { handlePlayerCollisionWithPlatform } from "./handlePlayerCollisionWithPlatform";
import { handlePlayerCollisionWithBorders } from "./handlePlayerCollisionWithBorders";
import { parseMap, parsePlatforms } from "../mapParser";
import { handlePlayerCollisionWithMagicPlatform } from "./handlePlayerCollisionWithMagicPlatform";
import { GRAVITY } from "../constants";

export default class World {
  platforms: any[] = [];
  magicPlatforms: any[] = [];
  player: any;

  constructor() {
    this.player = createPlayer(this);
  }

  loadMap(theMap) {
    const pieces = parseMap(theMap);

    this.platforms = parsePlatforms(pieces);

    const playerPosition = pieces.find(piece => piece.tileType === 8);
    this.player.x = playerPosition.x;
    this.player.y = playerPosition.y;
  }

  addMagicPlatform(sprite) {
    if (this.magicPlatforms.length === 0) {
      this.magicPlatforms.push(sprite);
    }
  }

  update(dt) {
    this.magicPlatforms.forEach(magicPlatform => magicPlatform.update());
    this.player.update(dt);

    if (!this.player.isOnFloor) {
      this.player.dy += GRAVITY * dt;
    } else {
      this.player.dy = 0;
    }

    handlePlayerCollisionWithPlatform(this);
    handlePlayerCollisionWithBorders(this);
    handlePlayerCollisionWithMagicPlatform(this);
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.magicPlatforms.forEach(magicPlatform => magicPlatform.render());
    this.player.render();
  }
}
