import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.atlas(
      TextureKeys.Hero,
      "assets/hero/hero.png",
      "assets/hero/hero.json"
    );
    this.load.image(TextureKeys.Tiles, "assets/Tiles.png");
    this.load.image(TextureKeys.BaseColor, "assets/Base-Color.png");
    this.load.image(TextureKeys.Buildings, "assets/Buildings.png");
    this.load.image(TextureKeys.Props1, "assets/Props-01.png");
    this.load.image(TextureKeys.BackgroundProps, "assets/Background-Props.png");
    this.load.tilemapTiledJSON(TextureKeys.Tilemap, "assets/main.json");
  }
  create() {
    this.scene.start(SceneKeys.Game);
  }
}
