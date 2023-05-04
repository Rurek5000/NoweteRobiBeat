import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";

export default class Hero extends Phaser.Physics.Matter.Sprite {
  private speed = 1.5;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);

    this.scene.add.existing(this);
  }
}
