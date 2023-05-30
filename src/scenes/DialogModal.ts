import Phaser from "phaser";
import { getChapter } from "../globals";
import { sharedInstance as events } from "./EventCenter";

export default class DialogModal extends Phaser.Scene {
  private bg!: Phaser.Physics.Matter.Factory.rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private index!: number;
  private image!: any;
  private text!: any;
  private jsonData!: any;
  private spaceKeyClicked!: boolean;

  constructor() {
    super({
      key: "dialogModal",
    });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image("kacper", "./assets/faces/kacper.png");
    this.load.image("pawel", "./assets/faces/pawel.png");
  }
  create(data: { name: string }) {
    this.index = 0;
    this.bg = this.matter.add.rectangle(
      this.sys.game.canvas.width * 0.5,
      this.sys.game.canvas.height - 100,
      this.sys.game.canvas.width,
      200,
      {
        isStatic: true,
        isSensor: true,
      }
    );

    fetch(`./assets/dialog/${data.name}.json`)
      .then((response) => response.json())
      .then((data) => {
        if (getChapter() == data.chapter) {
          this.showSpeech(data.dialog, this.index, this.bg);
          this.jsonData = data.dialog;
        } else {
          this.showSpeech(data.temp, this.index, this.bg);
          this.jsonData = data.temp;
        }
      })
      .catch((error) => {
        console.error("Błąd wczytywania pliku JSON:", error);
      });
  }
  update(t: number, dt: number) {
    if (this.cursors.space.isDown && !this.spaceKeyClicked) {
      if (this.index < Object.keys(this.jsonData).length) {
        this.spaceKeyClicked = true;
        this.showSpeech(this.jsonData, this.index, this.bg);
        this.index++;
        window.setTimeout(() => {
          this.spaceKeyClicked = false;
        }, 50);
      } else {
        this.scene.stop();
        events.emit("close");
      }
    }
  }

  private showSpeech(data: any, i: any, bg: any) {
    if (this.image) this.image.destroy();

    const value = data[i];
    const bgWidth = bg.bounds.max.x - bg.bounds.min.x;
    const bgHeight = bg.bounds.max.y - bg.bounds.min.y;

    const leftTopX = bg.position.x - bgWidth / 2;
    const leftTopY = bg.position.y - bgHeight / 2;

    const paddingX = 60;
    const paddingY = 30;

    this.image = this.matter.add.image(0, 0, value.image);
    this.text = this.add.text(leftTopX, leftTopY, value.content, {
      fontSize: "16px",
      color: "#fff",
      fontFamily: "font1",
      fixedWidth: bgWidth,
      fixedHeight: bgHeight,
      backgroundColor: "#000",
      padding: {
        left: paddingX,
        right: paddingX,
        top: paddingY,
        bottom: paddingY,
      },
    });

    const x = value.isHero
      ? leftTopX + this.image.width * 0.25
      : bgWidth - this.image.width * 0.25;

    this.image
      .setPosition(x, this.sys.game.canvas.height - this.image.height)
      .setStatic(true);
    this.image.setScale(0.5, 0.5);
  }
}
