import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class DialogModal extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private theme!: Phaser.Sound.BaseSound;

  constructor() {
    super("mainMenu");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.audio("neverFadeAway", "./assets/audio/neverFadeAway.mp3");
  }
  create() {
    this.theme = this.sound.add("neverFadeAway");
    this.theme.play();
  }
  update(t: number, dt: number) {
    if (this.cursors.space.isDown) {
      this.scene.start(SceneKeys.Street);
      this.theme.stop();
    }
  }
}
