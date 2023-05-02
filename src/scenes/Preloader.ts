import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

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

    this.createHeroAnimation();
  }

  private createHeroAnimation() {
    this.anims.create({
      key: AnimationKeys.HeroIdle,
      frameRate: 6,
      frames: this.anims.generateFrameNames("hero", {
        start: 0,
        end: 11,
        prefix: "Nowete-stand-",
        suffix: ".png",
      }),
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.HeroWalk,
      frameRate: 6,
      frames: this.anims.generateFrameNames("hero", {
        start: 0,
        end: 11,
        prefix: "Nowete-walk-",
        suffix: ".png",
      }),
      repeat: -1,
    });
  }
}
