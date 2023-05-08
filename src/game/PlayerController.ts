import Phaser from "phaser";
import StateMachine from "../statemachine/StateMachine";
import AnimationKeys from "../consts/AnimationKeys";

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export default class PlayerController {
  private sprite: Phaser.Physics.Matter.Sprite;
  private cursors: CursorKeys;
  private stateMachine: StateMachine;
  private speed: number;

  constructor(sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys) {
    this.sprite = sprite;
    this.cursors = cursors;
    this.speed = 1;
    this.createAnimations();
    this.stateMachine = new StateMachine(this, "player");

    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState("walk", {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .setState("idle");

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType;
      const gameObject = body.gameObject;

      if (!gameObject) return;
    });
  }

  update(dt: number) {
    this.stateMachine.update(dt);
  }

  private idleOnEnter() {
    this.sprite.play(AnimationKeys.HeroIdle, true);
  }
  private idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown)
      this.stateMachine.setState("walk");
  }

  private walkOnEnter() {
    this.sprite.play(AnimationKeys.HeroWalk, true);
  }
  private walkOnUpdate() {
    if (this.cursors.left.isDown) this.goLeft();
    else if (this.cursors.right.isDown) this.goRight();
    else this.stay();
  }

  private createAnimations() {
    this.sprite.anims.create({
      key: AnimationKeys.HeroIdle,
      frameRate: 6,
      frames: this.sprite.anims.generateFrameNames("hero", {
        start: 0,
        end: 11,
        prefix: "Nowete-stand-",
        suffix: ".png",
      }),
      repeat: -1,
    });

    this.sprite.anims.create({
      key: AnimationKeys.HeroWalk,
      frameRate: 6,
      frames: this.sprite.anims.generateFrameNames("hero", {
        start: 0,
        end: 11,
        prefix: "Nowete-walk-",
        suffix: ".png",
      }),
      repeat: -1,
    });
  }

  private goLeft() {
    this.sprite.flipX = true;
    this.sprite.setOrigin(0.6, 0.5).setVelocityX(-this.speed);
  }
  private goRight() {
    this.sprite.flipX = false;
    this.sprite.setOrigin(0.4, 0.5).setVelocityX(this.speed);
  }
  private stay() {
    this.sprite.setVelocityX(0);
    this.stateMachine.setState("idle");
  }
}
