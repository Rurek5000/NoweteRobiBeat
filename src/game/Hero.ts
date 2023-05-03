import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";

export default class Hero extends Phaser.Physics.Matter.Sprite {
  private speed = 1.5;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);

    this.scene.add.existing(this);
  }

  goLeft() {
    this.flipX = true;
    this.play(AnimationKeys.HeroWalk, true)
      .setOrigin(0.6, 0.5)
      .setVelocityX(-this.speed);
  }
  goRight() {
    this.flipX = false;
    this.play(AnimationKeys.HeroWalk, true)
      .setOrigin(0.4, 0.5)
      .setVelocityX(this.speed);
  }
  stay() {
    this.play(AnimationKeys.HeroIdle, true).setVelocityX(0);
  }
}
