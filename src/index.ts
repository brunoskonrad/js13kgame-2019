import { init } from "kontra/src/core";
import { initKeys, keyMap, keyPressed } from "kontra/src/keyboard";
import Sprite from "kontra/src/sprite";
import GameLoop from "kontra/src/gameLoop";
import World from "./World";

const { canvas } = init();

// Keyboard setup
initKeys();
keyMap[87] = "up";
keyMap[68] = "right";
keyMap[65] = "left";

const BASE_SIZE = 50;

const MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// let platforms = [];

// function loadMap(theMap) {
//   platforms = [];

//   theMap.forEach((row, columnIndex) => {
//     row.forEach((item, rowIndex) => {
//       if (item === 1) {
//         platforms.push(createPlatform(rowIndex * 50, columnIndex * 50));
//       }
//     });
//   });
// }

// loadMap(MAP);

function createPlatform(x = 0, y = 0) {
  return Sprite({
    x,
    y,
    type: "platform",
    width: BASE_SIZE,
    height: BASE_SIZE,
    color: "darkgray"
  });
}

const player = Sprite({
  type: "player",
  x: 350,
  y: 700,
  color: "salmon",
  width: BASE_SIZE,
  height: BASE_SIZE,
  moveRight() {
    this.dx = 5;
  },
  moveLeft() {
    this.dx = -5;
  },
  update() {
    this.advance();

    if (this.x + this.width > canvas.width) {
      this.dx = 0;
      this.x = canvas.width - this.width;
    }

    if (this.x < 0) {
      this.dx = 0;
      this.x = 0;
    }

    const collided =
      world.platforms.filter(platform =>
        checkCollisionWithPlatform(this, platform)
      ).length > 0;

    if (collided) {
      this.dy = 0;
    } else {
      this.dy = 5;
    }
  }
});

function checkCollisionWithPlatform(player, platform) {
  const playerBottomY = player.y + player.height;

  if (
    playerBottomY >= platform.y &&
    playerBottomY < platform.y + 10 &&
    (player.x + player.width > platform.x &&
      player.x < platform.x + platform.width)
  ) {
    return true;
  }
}

function handlePlayerInput(player) {
  if (keyPressed("up")) {
    player.dy = -5;
  }

  if (keyPressed("right")) {
    player.moveRight();
  }

  if (keyPressed("left")) {
    player.moveLeft();
  }

  if (
    (!keyPressed("left") && !keyPressed("right")) ||
    (keyPressed("left") && keyPressed("right"))
  ) {
    player.dx = 0;
  }
}

const world = new World();
world.loadMap(MAP);

const game = GameLoop({
  update: function() {
    handlePlayerInput(player);
    world.update();
    player.update();
  },
  render: function() {
    player.render();
    world.render();
  }
});

game.start();

window.world = world;
window.player = player;
