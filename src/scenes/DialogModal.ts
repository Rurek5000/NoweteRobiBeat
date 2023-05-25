import Phaser from "phaser";

export default class DialogModal extends Phaser.Scene {
  constructor() {
    super({
      key: "dialogModal",
    });
  }
  create() {
    this.matter.add.rectangle(
      this.sys.game.canvas.width * 0.5,
      this.sys.game.canvas.height - 100,
      this.sys.game.canvas.width,
      200,
      {
        isStatic: true,
        isSensor: true,
      }
    );
  }
}
