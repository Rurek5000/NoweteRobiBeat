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
    this.load.atlas(
      TextureKeys.Pawel,
      "assets/npc/pawel.png",
      "assets/npc/pawel.json"
    );
    this.load.atlas(
      TextureKeys.Bartosz,
      "assets/npc/bartosz.png",
      "assets/npc/bartosz.json"
    );
    this.load.atlas(
      TextureKeys.Portal,
      "assets/npc/portal.png",
      "assets/npc/portal.json"
    );

    this.load.audio("coconut", "./assets/audio/coconut.mp3");
    this.load.audio("forge-sound", "./assets/audio/forge.mp3");
    this.load.audio("street-sound", "./assets/audio/street.mp3");
    this.load.audio("home-sound", "./assets/audio/home.mp3");

    this.load.image("main-menu-bg", "assets/main-menu-bg.jpg");
    this.load.image(TextureKeys.Tiles, "assets/texture/Tiles.png");
    this.load.image(TextureKeys.BaseColor, "assets/texture/Base-Color.png");
    this.load.image(
      TextureKeys.BaseColorForge,
      "assets/texture/Base-Color-Forge.png"
    );
    this.load.image(TextureKeys.Grass, "assets/texture/grass.png");
    this.load.image(TextureKeys.GrassProps, "assets/texture/grass-props.png");
    this.load.image(TextureKeys.Background, "assets/texture/Background.png");
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
    this.load.tilemapTiledJSON(TextureKeys.Home, "assets/home.json");
    this.load.tilemapTiledJSON(TextureKeys.Gryl, "assets/gryl.json");
  }
  create() {
    this.scene.start(SceneKeys.MainMenu);
  }
}
