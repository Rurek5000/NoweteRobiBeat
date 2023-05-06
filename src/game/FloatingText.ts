import Phaser from "phaser";

export default class FloatingText {
  private scene: Phaser.Scene;
  private obj: MatterJS.BodyType;
  private x: number;
  private y: number;
  private text: string;
  private visibility: boolean;
  private style: Phaser.Types.GameObjects.Text.TextStyle;

  constructor(scene: Phaser.Scene, obj: MatterJS.BodyType, text: string) {
    this.scene = scene;
    this.obj = obj;
    this.x = obj.position.x;
    this.y = obj.position.y;
    this.text = text;
    this.style = {
      fontSize: "16px",
      color: "#fff",
    };
    this.visibility = false;

    obj.position.x + (obj.bounds.max.x - obj.bounds.min.x) / 2;

    this.scene.add
      .text(this.x, this.y, this.text, this.style)
      .setOrigin(0.5, 3);
  }
  // create() {}
  // update() {
  //   if(!this.visibility)

  // }
}
