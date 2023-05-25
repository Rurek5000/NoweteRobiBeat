import Phaser from "phaser";
import FloatingText from "../game/FloatingText";

export default class Npc extends Phaser.Physics.Matter.Sprite {
  private floatingText!: FloatingText;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);
    const rec = scene.matter.add.rectangle(x, y, this.width, this.height, {
      isStatic: true,
      isSensor: true,
    });

    this.scene.add.existing(this);
    this.floatingText = new FloatingText(scene, rec, "Talk (press spacebar)");
  }

  showText() {
    this.floatingText.showText();
  }
}
