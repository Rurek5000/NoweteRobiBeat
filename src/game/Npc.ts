import Phaser from "phaser";
import FloatingText from "../game/FloatingText";

export default class Npc extends Phaser.Physics.Matter.Sprite {
  private floatingText!: FloatingText;
  private index!: number;
  private rec!: MatterJS.BodyType;
  private isLeft!: boolean;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);
    this.rec = scene.matter.add.rectangle(x, y, this.width, this.height, {
      isStatic: true,
      isSensor: true,
    });
    this.index = 0;
    this.isLeft = true;
    this.scene.add.existing(this);
    this.floatingText = new FloatingText(
      scene,
      this.rec,
      "Talk (press spacebar)"
    );
  }

  update() {
    console.log("test");
  }

  showText() {
    this.floatingText.showText();
  }

  randomWalk() {
    if (this.index > 450) {
      this.index = 0;
      this.isLeft = !this.isLeft;
    }

    if (this.isLeft) this.goLeft();
    else this.goRight();

    this.index++;
  }

  private goLeft() {
    this.flipX = true;
    this.x--;
  }
  private goRight() {
    this.flipX = false;
    this.x++;
  }
  private stay() {
    console.log("stay");
  }
}
