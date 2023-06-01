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

    this.load.atlas(
      TextureKeys.Hobo,
      "assets/npc/hobo.png",
      "assets/npc/hobo.json"
    );
    this.load.atlas(
      TextureKeys.Rurek,
      "assets/npc/rurek.png",
      "assets/npc/rurek.json"
    );
    this.load.atlas(
      TextureKeys.Szymon,
      "assets/npc/szymon.png",
      "assets/npc/szymon.json"
    );

    this.load.image("main-menu-bg", "assets/main-menu-bg.jpg");
    this.load.image(TextureKeys.Tiles, "assets/texture/Tiles.png");
    this.load.image(TextureKeys.BaseColor, "assets/texture/Base-Color.png");
    this.load.image(
      TextureKeys.BaseColorForge,
      "assets/texture/Base-Color-Forge.png"
    );
    this.load.image(TextureKeys.Forge, "assets/texture/Forge.png");
    this.load.image(TextureKeys.ForgeProps, "assets/texture/Forge-props.png");
    this.load.image(TextureKeys.Buildings, "assets/texture/Buildings.png");
    this.load.image(TextureKeys.Props1, "assets/texture/Props-01.png");
    this.load.image(
      TextureKeys.BackgroundProps,
      "assets/texture/Background-Props.png"
    );

    this.load.tilemapTiledJSON(TextureKeys.Tilemap, "assets/main.json");
    this.load.tilemapTiledJSON(TextureKeys.Forge, "assets/kuznia.json");
    this.load.tilemapTiledJSON(TextureKeys.Magazine, "assets/magazine.json");
  }
  create() {
    this.scene.start(SceneKeys.MainMenu);
    // this.scene.start(SceneKeys.Street);
    // this.scene.start(SceneKeys.Magazine);
  }
}
