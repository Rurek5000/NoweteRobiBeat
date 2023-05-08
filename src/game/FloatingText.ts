import Phaser from "phaser";

export default class FloatingText {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  private text: string;
  private style: Phaser.Types.GameObjects.Text.TextStyle;
  private textObj!: Phaser.GameObjects.Text;
  private visibility: boolean;
  public obj: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, obj: MatterJS.BodyType, text: string) {
    this.scene = scene;
    this.obj = obj;
    this.x = obj.position.x;
    this.y = obj.position.y;
    this.text = text;
    this.style = {
      fontSize: "10px",
      color: "#fff",
      fontFamily: "font1",
      align: "center",
      wordWrap: { width: 100, useAdvancedWrap: true },
    };
    this.visibility = false;

    obj.position.x + (obj.bounds.max.x - obj.bounds.min.x) / 2;

    this.textObj = this.scene.add.text(this.x, this.y, this.text, this.style);

    this.textObj.setOrigin(0.5, 3).alpha = 0;
  }

  showText() {
    if (!this.visibility) {
      this.textObj.alpha = 1;
      this.visibility = true;
      window.setTimeout(() => {
        this.textObj.alpha = 0;
        this.visibility = false;
      }, 2000);
    }
  }
}
