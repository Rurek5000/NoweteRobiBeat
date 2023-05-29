import Phaser from "phaser";
import FloatingText from "../game/FloatingText";

export default class Npc extends Phaser.Physics.Matter.Sprite {
  private floatingText!: FloatingText;
  private index!: number;
  private rec!: MatterJS.BodyType;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);
    this.rec = scene.matter.add.rectangle(x, y, this.width, this.height, {
      isStatic: true,
      isSensor: true,
    });
    this.index = 0;
    const img = this.scene.add.existing(this);
    console.log(this);
    this.floatingText = new FloatingText(
      scene,
      this.rec,
      "Talk (press spacebar)"
    );
  }

  showText() {
    this.floatingText.showText();
  }

  randomWalk() {
    if (this.index < 300) {
      this.goLeft();
    }

    this.index++;
  }

  private goLeft() {
    this.flipX = true;
    // this.x--;
    // this.rec.position.x--;
  }
  private goRight() {
    this.flipX = false;
    this.x++;
  }
  private stay() {
    console.log("stay");
  }
}
