import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";
import PlayerController from "../game/PlayerController";
import FloatingText from "../game/FloatingText";
import SceneKeys from "../consts/SceneKeys";
import Npc from "../game/Npc";
import { sharedInstance as events } from "./EventCenter";
import { setChapter } from "../globals";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  private rurek!: Npc;
  private playerController?: PlayerController;
  private forge!: FloatingText;

  constructor() {
    super("street");
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
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
      switch (name) {
        case "spawn":
          {
            this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
            this.hero.setFixedRotation();
            this.hero.depth = 1;

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

            this.forge = new FloatingText(this, rec, "Kuźnia (spacja)");
          }
          break;
        case "rurek":
          {
            this.rurek = new Npc(
              this,
              x + width * 0.5,
              y - 8,
              TextureKeys.Rurek
            );
            this.rurek.setStatic(true);
            this.rurek.setSensor(true);
            this.rurek.anims.create({
              key: AnimationKeys.RurekIdle,
              frameRate: 4,
              frames: this.rurek.anims.generateFrameNames("rurek", {
                start: 0,
                end: 3,
                prefix: "Rurek-stand-",
                suffix: ".png",
              }),
              repeat: -1,
            });
            this.rurek.play(AnimationKeys.RurekIdle);
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

    this.matter.overlap(this.forge.obj, [this.hero], () => {
      this.forge.showText();
      if (this.cursors.space.isDown) {
        this.scene.start(SceneKeys.Forge);
        // setChapter(1);
      }
    });
    this.matter.overlap(this.rurek, [this.hero], () => {
      this.rurek.showText();
      if (this.cursors.space.isDown) {
        if (this.rurek.x > this.hero.x) this.rurek.flipX = true;
        else this.rurek.flipX = false;

        this.scene.pause();
        this.scene.launch("dialogModal", { name: "rurek" });
      }
    });

    events.on("close", () => {
      this.scene.resume();
    });
  }
}
