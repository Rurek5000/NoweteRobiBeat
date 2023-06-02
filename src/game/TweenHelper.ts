export default class TweenHelper {
  static flashElement(
    scene: any,
    element: Phaser.GameObjects.Text,
    repeat = true,
    easing = "Linear",
    overallDuration = 500,
    visiblePauseDuration = 500
  ) {
    if (scene && element) {
      const flashDuration = overallDuration - visiblePauseDuration / 2;

      scene.tweens.timeline({
        tweens: [
          {
            targets: element,
            duration: 0,
            alpha: 0,
            ease: easing,
          },
          {
            targets: element,
            duration: flashDuration,
            alpha: 1,
            ease: easing,
          },
          {
            targets: element,
            duration: visiblePauseDuration,
            alpha: 1,
            ease: easing,
          },
          {
            targets: element,
            duration: flashDuration,
            alpha: 0,
            ease: easing,
            onComplete: () => {
              if (repeat === true) {
                this.flashElement(scene, element);
              }
            },
          },
        ],
      });
    }
  }
}
