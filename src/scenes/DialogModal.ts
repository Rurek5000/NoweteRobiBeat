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
  private isWritten!: boolean;

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
    this.load.image("grzesiek", "./assets/faces/grzesiek.png");
    this.load.image("bartosz", "./assets/faces/bartosz.png");
    this.load.image("szymon-face", "./assets/faces/szymon-face.png");
    this.load.image("pawel", "./assets/faces/pawel.png");
  }
  create(data: { name: string }) {
    this.index = 0;
    this.isWritten = true;
    this.bg = this.matter.add.rectangle(
      this.sys.game.canvas.width * 0.5,
      this.sys.game.canvas.height - 50,
      this.sys.game.canvas.width,
      100,
      {
        isStatic: true,
        isSensor: true,
      }
    );

    fetch(`./assets/dialog/${data.name}.json`)
      .then((response) => response.json())
      .then((data) => {
        // if (getChapter() == data.chapter) this.jsonData = data.dialog;
        // else this.jsonData = data.temp;

        this.jsonData = data[getChapter()];

        this.showSpeech(this.jsonData, this.index, this.bg);
      })
      .catch((error) => {
        console.error("Błąd wczytywania pliku JSON:", error);
      });
  }
  update(t: number, dt: number) {
    if (this.cursors.space.isDown && this.isWritten) {
      this.index++;
      if (this.index < Object.keys(this.jsonData).length) {
        this.showSpeech(this.jsonData, this.index, this.bg);
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

    console.log(value);

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
    this.writeText(this.text);

    const x = value.isHero
      ? leftTopX + this.image.width * 0.25
      : bgWidth - this.image.width * 0.25;

    this.image
      .setPosition(x, this.sys.game.canvas.height - this.image.height + 90)
      .setStatic(true);
    this.image.setScale(0.5, 0.5);
  }

  private writeText(text: Phaser.GameObjects.Text) {
    const fullText = text.text;
    const length = text.text.length;
    let i = 0;
    this.isWritten = false;

    text.text = "";
    this.time.addEvent({
      callback: () => {
        text.text += fullText[i];
        ++i;
        if (length == i) this.isWritten = true;
      },
      repeat: length - 1,
      delay: 35,
    });
  }
}
