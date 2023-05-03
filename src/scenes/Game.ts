import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero?: Hero;

  constructor() {
    super("game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("Tiles", "tiles");
    const baseColor = map.addTilesetImage("Base Color", "base-color");
    const backgroundProps = map.addTilesetImage(
      "Background Props",
      "background-props"
    );
    const buildings = map.addTilesetImage("Buildings", "buildings");
    const decoration = map.addTilesetImage("Props-01", "props-01");

    map.createLayer("bg", baseColor);
    map.createLayer("bg_2", [backgroundProps, buildings, decoration]);
    map.createLayer("building", buildings);
    map.createLayer("decoration", [buildings, decoration]);

    const ground = map.createLayer("ground", tileset);
    ground.setCollisionByProperty({ collides: true });

    const objectsLayer = map.getObjectLayer("objects");
    const camera = this.cameras.main;
    console.log(objectsLayer.objects);
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0 } = objData;
      switch (name) {
        case "spawn":
          {
            this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
            this.hero.play(AnimationKeys.HeroIdle).setFixedRotation();
            camera.startFollow(
              this.hero,
              undefined,
              undefined,
              undefined,
              undefined,
              130
            );
          }
          break;
        case "worldBound":
          {
            if (
              typeof objData.x !== "undefined" &&
              typeof objData.width !== "undefined"
            ) {
              camera.setBounds(
                objData.x,
                0,
                objData.width,
                Number(this.game.config.height)
              );
              this.matter.world.setBounds(
                objData.x,
                0,
                objData.width,
                Number(this.game.config.height),
                16
              );
            }
          }
          break;
      }
    });

    this.cameras.main.zoom = 1.3;
    this.matter.world.convertTilemapLayer(ground);
  }

  update() {
    if (!this.hero) return;

    if (this.cursors.left.isDown) this.hero.goLeft();
    else if (this.cursors.right.isDown) this.hero.goRight();
    else this.hero.stay();
  }
}
