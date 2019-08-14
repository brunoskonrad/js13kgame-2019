const { init, initKeys, keyPressed, Sprite, GameLoop } = kontra;
const { canvas } = init();
initKeys();

const BASE_SIZE = 50;

let platforms = [
  createPlatform(0, 750),
  createPlatform(50, 750),
  createPlatform(100, 750),
  createPlatform(150, 750),
  createPlatform(200, 750),
  createPlatform(250, 750),
  createPlatform(300, 750),
  createPlatform(350, 750)
];

last = platforms[platforms.length - 1];

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
  color: "red",
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
      platforms.filter(platform =>
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
  const MVP_playerRight = player.x + player.width;

  if (
    playerBottomY >= platform.y &&
    (MVP_playerRight > platform.x && player.x < platform.x + platform.width)
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
