import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import Hero from "../game/Hero";
import TextureKeys from "../consts/TextureKeys";
// import PlayerController from "../game/PlayerController";
// import FloatingText from "../game/FloatingText";
// import SceneKeys from "../consts/SceneKeys";
// import { sharedInstance as events } from "./EventCenter";
import Npc from "../game/Npc";
// import { getChapter, setChapter } from "../globals";

export default class Home extends Phaser.Scene {
  // private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private hero!: Hero;
  // private playerController?: PlayerController;
  private bartosz!: Npc;
  private rurek!: Npc;
  private szymon!: Npc;
  private pawel!: Npc;
  private theme!: any;

  constructor() {
    super("gryl");
  }

  // init() {
  //   this.cursors = this.input.keyboard.createCursorKeys();
  // }

  create() {
    const map = this.make.tilemap({ key: "gryl" });
    const bg = map.addTilesetImage("Background", "background");
    const grass = map.addTilesetImage("Grass", "grass");
    const grassProps = map.addTilesetImage("Grass-props", "grass-props");
    this.theme = this.sound.add("coconut");
    this.theme.play();
    this.scene.launch("dialogModal", { name: "end" });

    map.createLayer("bg", bg);
    map.createLayer("decoration", grassProps);

    const ground = map.createLayer("ground", grass);
    ground.setCollisionByProperty({ collides: true });

    const objectsLayer = map.getObjectLayer("objects");
    const camera = this.cameras.main;
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, width = 0 } = objData;
      switch (name) {
        case `spawn`:
          {
            this.hero = new Hero(this, x + width * 0.5, y, TextureKeys.Hero);
            this.hero.play(AnimationKeys.HeroWalk).setFixedRotation();
            // this.playerController = new PlayerController(
            //   this.hero,
            //   this.cursors
            // );
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
            this.rurek.flipX = true;
          }
          break;
        case "lev":
          {
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
            this.bartosz.flipX = true;
          }
          break;
      }
    });
    this.cameras.main.zoom = 1.3;
    this.matter.world.convertTilemapLayer(ground);
  }

  // update(dt: number) {}
}
