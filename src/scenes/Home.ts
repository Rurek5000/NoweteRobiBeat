import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";
import PlayerController from "../game/PlayerController";
import FloatingText from "../game/FloatingText";
import SceneKeys from "../consts/SceneKeys";
import { sharedInstance as events } from "./EventCenter";
import Npc from "../game/Npc";
import { getChapter, setChapter } from "../globals";

export default class Home extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  private playerController?: PlayerController;
  private home!: FloatingText;
  private bartosz!: Npc;

  constructor() {
    super("home");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: "home" });
    const buildings = map.addTilesetImage("Buildings", "buildings");
    const forgeProps = map.addTilesetImage("Forge Props", "forge-props");
    const decoration = map.addTilesetImage("Props-01", "props-01");

    map.createLayer("bg", buildings);
    map.createLayer("decoration", [decoration, forgeProps, buildings]);

    const ground = map.createLayer("ground", buildings);
    ground.setCollisionByProperty({ collides: true });

    const objectsLayer = map.getObjectLayer("objects");
    const camera = this.cameras.main;
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
      switch (name) {
        case `spawn`:
          {
            this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
            this.hero.play(AnimationKeys.HeroWalk).setFixedRotation();
            this.playerController = new PlayerController(
              this.hero,
              this.cursors
            );
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
            camera.setBounds(x, 0, width, Number(this.game.config.height));
            this.matter.world.setBounds(
              x,
              0,
              width,
              Number(this.game.config.height),
              16
            );
          }
          break;
        case "street":
          {
            const rec = this.matter.add.rectangle(
              x + width * 0.5,
              y + height * 0.5,
              width,
              height,
              {
                isStatic: true,
                isSensor: true,
              }
            );
            this.home = new FloatingText(this, rec, "Home (press spacebar)");
          }
          break;
        case "lev":
          {
            console.log("obsraniec");
            this.bartosz = new Npc(
              this,
              x + width * 0.5,
              y - 12,
              TextureKeys.Bartosz
            );
            this.bartosz.setStatic(true);
            this.bartosz.setSensor(true);
            this.bartosz.anims.create({
              key: AnimationKeys.BartoszIdle,
              frameRate: 4,
              frames: this.bartosz.anims.generateFrameNames("bartosz", {
                start: 0,
                end: 3,
                prefix: "Bartosz-stand-",
                suffix: ".png",
              }),
              repeat: -1,
            });
            this.bartosz.play(AnimationKeys.BartoszIdle);
          }
          break;
      }
    });
    this.cameras.main.zoom = 1.3;
    this.matter.world.convertTilemapLayer(ground);
  }

  update(t: number, dt: number) {
    if (!this.playerController) return;
    this.playerController.update(dt);

    this.matter.overlap(this.home.obj, [this.hero], () => {
      this.home.showText();
      if (this.cursors.space.isDown)
        this.scene.start(SceneKeys.Street, { before: "home" });
    });
    this.matter.overlap(this.bartosz, [this.hero], () => {
      this.bartosz.showText();
      if (this.cursors.space.isDown) {
        if (this.bartosz.x > this.hero.x) this.bartosz.flipX = true;
        else this.bartosz.flipX = false;

        this.scene.pause();
        this.scene.launch("dialogModal", { name: "bartek" });
      }
    });

    events.on(`close-bartek`, () => {
      this.scene.resume();
      if (getChapter() == 5) setChapter(6);
    });
  }
}
