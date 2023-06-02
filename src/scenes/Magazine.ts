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

export default class Magazine extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  private playerController?: PlayerController;
  private home!: FloatingText;
  private pawel!: Npc;

  constructor() {
    super("magazine");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: "magazine" });
    const tileset = map.addTilesetImage("Tiles", "tiles");
    const buildings = map.addTilesetImage("Buildings", "buildings");

    map.createLayer("bg", buildings);
    map.createLayer("decoration", buildings);

    const ground = map.createLayer("ground", tileset);
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
        case "forge":
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
        case "pawel":
          {
            this.pawel = new Npc(
              this,
              x + width * 0.5,
              y - 12,
              TextureKeys.Pawel
            );
            this.pawel.setStatic(true);
            this.pawel.setSensor(true);
            this.pawel.anims.create({
              key: AnimationKeys.PawelIdle,
              frameRate: 4,
              frames: this.pawel.anims.generateFrameNames("pawel", {
                start: 0,
                end: 3,
                prefix: "Pawel-stand-",
                suffix: ".png",
              }),
              repeat: -1,
            });
            this.pawel.play(AnimationKeys.PawelIdle);
          }
          break;
      }
    });
    this.cameras.main.zoom = 1.3;
    this.matter.world.convertTilemapLayer(ground);
  }

  update(dt: number) {
    if (!this.playerController) return;
    this.playerController.update(dt);

    this.matter.overlap(this.home.obj, [this.hero], () => {
      this.home.showText();
      if (this.cursors.space.isDown)
        this.scene.start(SceneKeys.Forge, { before: "magazine" });
    });
    this.matter.overlap(this.pawel, [this.hero], () => {
      this.pawel.showText();
      if (this.cursors.space.isDown) {
        if (this.pawel.x > this.hero.x) this.pawel.flipX = true;
        else this.pawel.flipX = false;

        this.scene.pause();
        this.scene.launch("dialogModal", { name: "pawel" });
      }
    });

    events.on(`close-pawel`, () => {
      this.scene.resume();
      if (getChapter() == 2) setChapter(3);
    });
  }
}
