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

export default class Forge extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  private playerController?: PlayerController;
  private home!: FloatingText;
  private magazine!: FloatingText;
  private szymon!: Npc;
  private before!: string;
  private theme!: any;

  constructor() {
    super("forge");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(data: { before: string }) {
    const map = this.make.tilemap({ key: "forge" });
    const tileset = map.addTilesetImage("Tiles", "tiles");
    const buildings = map.addTilesetImage("Buildings", "buildings");
    const baseColor = map.addTilesetImage("Base Color", "base-color-forge");
    const forge = map.addTilesetImage("forge", "forge");
    const forgeProps = map.addTilesetImage("Forge Props", "forge-props");

    const decoration = map.addTilesetImage("Props-01", "props-01");

    this.before = data.before ? `-${data.before}` : "";

    this.theme = this.sound.add("forge-sound");
    this.theme.play();

    map.createLayer("bg", [buildings, baseColor]);
    map.createLayer("bg_2", forge);
    map.createLayer("decoration", [decoration, forgeProps]);

    const ground = map.createLayer("ground", tileset);
    ground.setCollisionByProperty({ collides: true });

    const objectsLayer = map.getObjectLayer("objects");
    const camera = this.cameras.main;
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
      switch (name) {
        case `spawn${this.before}`:
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
            this.home = new FloatingText(this, rec, "Ulica (spacja)");
            const portal = new Npc(
              this,
              x + width * 0.5,
              y,
              TextureKeys.Portal
            );
            portal.setStatic(true);
            portal.setSensor(true);
            portal.anims.create({
              key: AnimationKeys.PortalLoop,
              frameRate: 4,
              frames: portal.anims.generateFrameNames("portal", {
                start: 0,
                end: 5,
                prefix: "portal-loop-",
                suffix: ".png",
              }),
              repeat: -1,
            });

            portal.play(AnimationKeys.PortalLoop);
          }
          break;
        case "magazine":
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
            this.magazine = new FloatingText(this, rec, "Magazyn (spacja)");
            const portal = new Npc(
              this,
              x + width * 0.5,
              y,
              TextureKeys.Portal
            );
            portal.setStatic(true);
            portal.setSensor(true);
            portal.anims.create({
              key: AnimationKeys.PortalLoop,
              frameRate: 4,
              frames: portal.anims.generateFrameNames("portal", {
                start: 0,
                end: 5,
                prefix: "portal-loop-",
                suffix: ".png",
              }),
              repeat: -1,
            });

            portal.play(AnimationKeys.PortalLoop);
          }
          break;
        case "szymon":
          {
            this.szymon = new Npc(
              this,
              x + width * 0.5,
              y - 8,
              TextureKeys.Szymon
            );
            this.szymon.setStatic(true);
            this.szymon.setSensor(true);
            this.szymon.anims.create({
              key: AnimationKeys.SzymonIdle,
              frameRate: 4,
              frames: this.szymon.anims.generateFrameNames("szymon", {
                start: 0,
                end: 3,
                prefix: "Szymon-stand-",
                suffix: ".png",
              }),
              repeat: -1,
            });
            this.szymon.play(AnimationKeys.SzymonIdle);
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
      if (this.cursors.space.isDown) {
        this.theme.stop();
        this.scene.start(SceneKeys.Street, { before: "forge" });
      }
    });
    this.matter.overlap(this.magazine.obj, [this.hero], () => {
      this.magazine.showText();
      if (this.cursors.space.isDown) {
        this.theme.stop();
        this.scene.start(SceneKeys.Magazine);
      }
    });
    this.matter.overlap(this.szymon, [this.hero], () => {
      this.szymon.showText();
      if (this.cursors.space.isDown) {
        if (this.szymon.x > this.hero.x) this.szymon.flipX = true;
        else this.szymon.flipX = false;

        this.scene.pause();
        this.scene.launch("dialogModal", { name: "szymon" });
      }
    });

    events.on(`close-szymon`, () => {
      this.scene.resume();
      if (getChapter() == 1) setChapter(2);
      if (getChapter() == 3) setChapter(4);
    });
  }
}
