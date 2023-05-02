import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene.matter.world, x, y, texture);

    this.scene.add.existing(this);

    // const hero = world.add
    //   .sprite(this, 0, 0, TextureKeys.Hero)
    //   .play(AnimationKeys.PlayerIdle);
    // .setFixedRotation();

    // this.add(hero);
  }
}
