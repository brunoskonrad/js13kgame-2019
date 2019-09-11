import { init } from "kontra/src/core";
import { initKeys, keyMap } from "kontra/src/keyboard";

import Game from "./game";

init();

// Keyboard setup
initKeys();
keyMap[16] = "shift";
keyMap[87] = "up";
keyMap[68] = "right";
keyMap[65] = "left";

const game = new Game();

window.game = game;
