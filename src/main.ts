import Phaser from "phaser";

import Street from "./scenes/Street";
import GameOver from "./scenes/GameOver";
import Preloader from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [Preloader, Street, GameOver],
};

export default new Phaser.Game(config);
