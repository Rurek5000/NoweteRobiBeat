import Phaser from "phaser";

import Game from "./scenes/Game";
import Preloader from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 505,
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
