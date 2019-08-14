const { init, initKeys, keyPressed, Sprite, GameLoop } = kontra;
const { canvas } = init();
initKeys();

const player = Sprite({
  type: 'player',
  x: 10,
  y: 750,
  color: "red",
  width: 50,
  height: 50,
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
  }
});

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
  }
});

game.start();
