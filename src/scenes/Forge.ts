import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";
import PlayerController from "../game/PlayerController";
import FloatingText from "../game/FloatingText";
import SceneKeys from "../consts/SceneKeys";

export default class Forge extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  private playerController?: PlayerController;
  private home!: FloatingText;

  constructor() {
    super("forge");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: "fo" });
    // const kuznia = map.addTilesetImage("Kuznia-1", "1");
    // const kuzniaBg = map.addTilesetImage("Kuznia-bg", "1");
    // const kuzniaBg2 = map.addTilesetImage("Kuznia-bg-2", "2");
    // const kuzniaBg3 = map.addTilesetImage("Kuznia-bg-3", "3");
    // const kuzniaBg4 = map.addTilesetImage("Kuznia-bg-4", "4");
    // const kuzniaBg5 = map.addTilesetImage("Kuznia-bg-5", "5");
    // const kuzniaDecoration = map.addTilesetImage(
    //   "Kuznia-decoration",
    //   "kuznia-decoration"
    // );
    // map.createLayer("Kuznia-bg", kuzniaBg);
    // map.createLayer("Kuznia-bg-2", kuzniaBg2);
    // map.createLayer("Kuznia-bg-3", kuzniaBg3);
    // map.createLayer("Kuznia-bg-4", kuzniaBg4);
    // map.createLayer("Kuznia-bg-5", kuzniaBg5);
    // map.createLayer("Kuznia-decoration", kuzniaDecoration);
    // const ground = map.createLayer("Kuznia-floor", kuznia);
    // ground.setCollisionByProperty({ collides: true });
    // const objectsLayer = map.getObjectLayer("objects");
    // const camera = this.cameras.main;
    // objectsLayer.objects.forEach((objData) => {
    //   const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
    //   switch (name) {
    //     case "spawn":
    //       {
    //         this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
    //         this.hero.play(AnimationKeys.HeroIdle).setFixedRotation();
    //         this.playerController = new PlayerController(
    //           this.hero,
    //           this.cursors
    //         );
    //         camera.startFollow(
    //           this.hero,
    //           undefined,
    //           undefined,
    //           undefined,
    //           undefined,
    //           130
    //         );
    //       }
    //       break;
    //     case "worldBound":
    //       {
    //         camera.setBounds(x, 0, width, Number(this.game.config.height));
    //         this.matter.world.setBounds(
    //           x,
    //           0,
    //           width,
    //           Number(this.game.config.height),
    //           16
    //         );
    //       }
    //       break;
    //     case "home":
    //       {
    //         const rec = this.matter.add.rectangle(
    //           x + width * 0.5,
    //           y + height * 0.5,
    //           width,
    //           height,
    //           {
    //             isStatic: true,
    //             isSensor: true,
    //           }
    //         );
    //         this.home = new FloatingText(this, rec, "Home (press spacebar)");
    //       }
    //       break;
    //   }
    // });
    // this.cameras.main.zoom = 1.3;
    // this.matter.world.convertTilemapLayer(ground);
  }

  update(t: number, dt: number) {
    if (!this.playerController) return;
    this.playerController.update(dt);

    this.matter.overlap(this.home.obj, [this.hero], () => {
      this.home.showText();
      if (this.cursors.space.isDown) this.scene.start(SceneKeys.GameOver);
    });
  }
}
