import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";

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
    this.createHeroAnimation();

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
          this.hero = this.matter.add
            .sprite(x + width * 0.5, y, "hero")
            .play("player-idle")
            .setFixedRotation();
          this.cameras.main.startFollow(this.hero);
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
      this.hero.setVelocityX(-speed);
      this.hero.play("player-walk", true);
      this.hero.setOrigin(0.6, 0.5);
    } else if (this.cursors.right.isDown) {
      this.hero.flipX = false;
      this.hero.setVelocityX(speed);
      this.hero.setOrigin(0.4, 0.5);

      this.hero.play("player-walk", true);
    } else {
      this.hero.setVelocityX(0);
      this.hero.play("player-idle", true);
    }
  }

  private createHeroAnimation() {
    this.anims.create({
      key: AnimationKeys.PlayerIdle,
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
      key: AnimationKeys.PlayerWalk,
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
