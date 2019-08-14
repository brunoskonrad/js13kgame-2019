const { init, initKeys, keyPressed, Sprite, GameLoop } = kontra;
const { canvas } = init();
initKeys();

const BASE_SIZE = 50;

const MAP = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let platforms = [];

function loadMap(theMap) {
  theMap.forEach((row, columnIndex) => {
    row.forEach((item, rowIndex) => {
      if (item === 1) {
        console.log(rowIndex, columnIndex);
        platforms.push(createPlatform(rowIndex * 50, columnIndex * 50));
      }
    });
  });
}

loadMap(MAP);

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
  y: 600,
  color: "salmon",
  width: BASE_SIZE,
  height: BASE_SIZE,
  dy: 5,
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
      platforms.filter(platform => checkCollisionWithPlatform(this, platform))
        .length > 0;

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
    // player.dy = 0;
    return true;
  }
}

function handlePlayerInput(player) {
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

const game = GameLoop({
  update: function() {
    handlePlayerInput(player);
    player.update();
  },
  render: function() {
    player.render();
    platforms.forEach(platform => platform.render());
  }
});

game.start();
