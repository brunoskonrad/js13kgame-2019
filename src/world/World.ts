import { on } from "kontra/src/events";

import { createPlayer } from "../player/player";

import { handlePlayerCollisionWithPlatform } from "./handlePlayerCollisionWithPlatform";
import { handlePlayerCollisionWithBorders } from "./handlePlayerCollisionWithBorders";
import { parseMap, parsePlatforms } from "../mapParser";
import { GRAVITY } from "../constants";
import { createFloatyGem } from "../entities/FloatyGem";
import { handlePlayerCollisionWithCollectables } from "./handlePlayerCollisionWithCollectables";
import Events from "../utils/Events";
import { createCollectableMagicPlatform } from "../entities/collectableMagicPlatform";
import Timer from "../utils/Timer";
import Game from "../game";

export default class World {
  game: Game;
  platforms: any[] = [];
  magicPlatforms: any[] = [];
  player: any;
  floatyGem: any = createFloatyGem();
  collectableMagicPlatforms: any[] = [];

  constructor(game: Game) {
    this.game = game;
    this.player = createPlayer(this);
    this.player.init();

    Events.on("MAGIC_PLATFORM_GONE", this.removeOldMagicPlatforms);
    Events.on("FLOATY_GEM_COLLECTED", this.endLevel);
  }

  restore() {
    this.platforms = [];
    this.magicPlatforms = [];
    this.collectableMagicPlatforms = [];
  }

  endLevel = () => {
    Timer.stop();
    this.game.menu.state = "game-score";
    this.game.menu.display();
  };

  loadMap(theMap) {
    this.restore();

    const pieces = parseMap(theMap);

    console.log(pieces);

    this.platforms = parsePlatforms(pieces);

    const playerPosition = pieces.find(piece => piece.tileType === 8);
    this.player.x = playerPosition.x;
    this.player.y = playerPosition.y;

    const gemPosition = pieces.find(piece => piece.tileType === 7);
    this.floatyGem.x = gemPosition.x + 6;
    this.floatyGem.y = gemPosition.y + 6;

    const collectableMagicPlatformPositions = pieces.filter(
      piece => piece.tileType === 2
    );
    collectableMagicPlatformPositions.forEach(position => {
      this.collectableMagicPlatforms.push(
        createCollectableMagicPlatform(position.x, position.y)
      );
    });
  }

  get collisionElements() {
    return [...this.platforms, ...this.magicPlatforms];
  }

  get collectableElements() {
    return [this.floatyGem, ...this.collectableMagicPlatforms].filter(
      element => element.collectable && !element.wasCollected
    );
  }

  get canSpawnNewMagicPlatform() {
    return this.player.totalAmountOfMagicPlatforms > this.magicPlatforms.length;
  }

  removeOldMagicPlatforms = () => {
    this.magicPlatforms = this.magicPlatforms.filter(
      magicPlatform => magicPlatform.exists
    );
  };

  addMagicPlatform(sprite) {
    this.magicPlatforms.push(sprite);
  }

  update(dt) {
    this.magicPlatforms.forEach(magicPlatform => magicPlatform.update());
    this.collectableElements.forEach(collectableElements =>
      collectableElements.update()
    );
    this.player.update(dt);

    if (!this.player.isOnFloor) {
      this.player.dy += GRAVITY * dt;
    } else {
      this.player.dy = 0;
    }

    handlePlayerCollisionWithPlatform(this);
    handlePlayerCollisionWithBorders(this);
    handlePlayerCollisionWithCollectables(this);
  }

  render() {
    this.platforms.forEach(platform => platform.render());
    this.magicPlatforms.forEach(magicPlatform => magicPlatform.render());
    this.collectableElements.forEach(collectableElements =>
      collectableElements.render()
    );

    this.player.render();
  }
}
