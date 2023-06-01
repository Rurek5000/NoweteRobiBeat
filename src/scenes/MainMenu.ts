import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";
import TweenHelper from "../game/TweenHelper";

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
    const background = this.add.image(0, 0, "main-menu-bg");
    const x = background.width / 2;
    const y = background.height / 2;
    const enterText = this.add.text(400, 400, "Klyknij spację", {
      fontSize: "30px",
      color: "#fff",
      fontFamily: "font1",
      align: "center",
    });
    const mainText = this.add.text(400, 300, "Nowete Robi Bit", {
      fontSize: "80px",
      color: "#fff",
      fontFamily: "font1",
      align: "center",
    });

    this.theme = this.sound.add("neverFadeAway");
    this.theme.play();

    background.setPosition(x, y);

    enterText.setOrigin(0.5, 3);
    enterText.setStroke("#000", 4);
    mainText.setOrigin(0.5, 3);
    mainText.setStroke("#000", 6);
    TweenHelper.flashElement(this, enterText);
  }
  update(t: number, dt: number) {
    if (this.cursors.space.isDown) {
      this.scene.start(SceneKeys.Street);
      this.theme.stop();
    }
  }
}
