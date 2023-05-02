import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero?: Phaser.Physics.Matter.Sprite;

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
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0 } = objData;
      switch (name) {
        case "spawn": {
          this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
          this.hero.play(AnimationKeys.HeroIdle).setFixedRotation();
          this.cameras.main.startFollow(
            this.hero,
            undefined,
            undefined,
            undefined,
            undefined,
            85
          );
        }
      }
    });

    this.cameras.main.scrollY = -150;
    this.cameras.main.zoom = 1.5;

    this.matter.world.convertTilemapLayer(ground);
  }

  update() {
    if (!this.hero) return;

    const speed = 0.4;
    if (this.cursors.left.isDown) {
      this.hero.flipX = true;
      this.hero
        .play(AnimationKeys.HeroWalk, true)
        .setOrigin(0.6, 0.5)
        .setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.hero.flipX = false;
      this.hero
        .play(AnimationKeys.HeroWalk, true)
        .setOrigin(0.4, 0.5)
        .setVelocityX(speed);
    } else {
      this.hero.play(AnimationKeys.HeroIdle, true).setVelocityX(0);
    }
  }
}
