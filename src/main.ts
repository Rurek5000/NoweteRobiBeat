import Phaser from "phaser";

import Street from "./scenes/Street";
import Forge from "./scenes/Forge";
import DialogModal from "./scenes/DialogModal";
import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import Magazine from "./scenes/Magazine";

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
  scene: [Preloader, MainMenu, Street, Forge, Magazine, DialogModal],
};

export default new Phaser.Game(config);
