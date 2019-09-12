import { MapPieces, parseMap, parsePlatforms } from "../mapParser";
import World from "../world/World";
import { createFloatyGem } from "../entities/FloatyGem";
import { createCollectableMagicPlatform } from "../entities/collectableMagicPlatform";

class BaseLevel {
  world: World;

  map: string;
  availableMagicPlatformsAtTheBeginning: number = 0;
  name: string = "BaseLevel";

  constructor(world: World) {
    this.world = world;
  }

  start() {
    this.world.restore();
    this.world.player.totalAmountOfMagicPlatforms = this.availableMagicPlatformsAtTheBeginning;

    const pieces = parseMap(this.map);

    this.world.platforms = parsePlatforms(pieces);
    this.world.floatyGem = createFloatyGem();

    const playerPosition = pieces.find(piece => piece.tileType === 8);
    this.world.player.x = playerPosition.x;
    this.world.player.y = playerPosition.y;

    const gemPosition = pieces.find(piece => piece.tileType === 7);
    this.world.floatyGem.x = gemPosition.x + 6;
    this.world.floatyGem.y = gemPosition.y + 6;

    const collectableMagicPlatformPositions = pieces.filter(
      piece => piece.tileType === 2
    );
    collectableMagicPlatformPositions.forEach(position => {
      this.world.collectableMagicPlatforms.push(
        createCollectableMagicPlatform(position.x, position.y)
      );
    });
  }
}

export default BaseLevel;
