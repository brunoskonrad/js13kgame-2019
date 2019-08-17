import { init } from "kontra/src/core";
import { initKeys, keyMap } from "kontra/src/keyboard";
import GameLoop from "kontra/src/gameLoop";

import World from "./world/World";
import firstMap from "./maps/first.map";

init();

// Keyboard setup
initKeys();
keyMap[16] = "shift";
keyMap[87] = "up";
keyMap[68] = "right";
keyMap[65] = "left";

const world = new World();
world.loadMap(firstMap);

const game = GameLoop({
  update: function(d) {
    world.update(d);
  },
  render: function() {
    world.render();
  }
});

game.start();

window.world = world;
