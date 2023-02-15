/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tank extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tank", "./Tank/costumes/tank.svg", {
        x: 35.63875795540494,
        y: 33.37520588628891
      })
    ];

    this.sounds = [new Sound("Meow", "./Tank/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.goto(0, 0);
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.mouse.down || this.keyPressed("space")) {
        this.sprites["Ball"].createClone();
        yield* this.wait(0.1);
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.clearPen();
    while (true) {
      this.effects.color += 0.5;
      yield;
    }
  }
}
