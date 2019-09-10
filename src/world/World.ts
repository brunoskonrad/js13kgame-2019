import { on } from "kontra/src/events";

import { createPlayer } from "../player/player";

import { handlePlayerCollisionWithPlatform } from "./handlePlayerCollisionWithPlatform";
import { handlePlayerCollisionWithBorders } from "./handlePlayerCollisionWithBorders";
import { parseMap, parsePlatforms } from "../mapParser";
import { GRAVITY, GAME_EVENT_MAGIC_PLATFORM_GONE } from "../constants";
import Camera from "./Camera";

export default class World {
  platforms: any[] = [];
  magicPlatforms: any[] = [];
  player: any;
  camera: Camera = new Camera();

  constructor() {
    this.player = createPlayer(this);

    on(GAME_EVENT_MAGIC_PLATFORM_GONE, this.removeOldMagicPlatforms);
  }

  loadMap(theMap) {
    const pieces = parseMap(theMap);

    this.platforms = parsePlatforms(pieces);

    const playerPosition = pieces.find(piece => piece.tileType === 8);
    this.player.x = playerPosition.x;
    this.player.y = playerPosition.y;
  }

  get collisionElements() {
    return [...this.platforms, ...this.magicPlatforms];
  }

  removeOldMagicPlatforms = () => {
    this.magicPlatforms = this.magicPlatforms.filter(magicPlatform => magicPlatform.exists);
  }

  addMagicPlatform(sprite) {
    this.magicPlatforms.push(sprite);
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
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.magicPlatforms.forEach(magicPlatform => magicPlatform.render());
    this.player.render();
  }
}
