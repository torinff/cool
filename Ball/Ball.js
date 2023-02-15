/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ball extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ball", "./Ball/costumes/ball.svg", { x: 8, y: 8 }),
      new Costume("normal", "./Ball/costumes/normal.svg", {
        x: -2.2000000000000455,
        y: 3.799999999999983
      })
    ];

    this.sounds = [new Sound("pop", "./Ball/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.speedX = -7.67307994821198;
    this.vars.speedY = 4.95293427844936;
    this.vars.dir = 30;
    this.vars.dirStart = -105;
    this.vars.dotProduct = -2.6377046761526746;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    this.effects.ghost = 100;
    /* TODO: Implement music_playDrumForBeats */ null;
    this.goto(this.sprites["Tank"].x, this.sprites["Tank"].y);
    this.direction = this.radToScratch(
      Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
    );
    this.move(30);
    this.vars.speedX = this.mouse.x / 10;
    this.vars.speedY = this.mouse.y / 10;
    this.penDown = true;
    this.penSize = 0;
    for (let i = 0; i < 150; i++) {
      yield* this.tick();
      this.penSize = 16;
      this.penColor.h += 5;
      yield;
    }
    for (let i = 0; i < 40; i++) {
      this.effects.ghost += 5;
      yield* this.tick();
      this.penColor.h += 5;
      yield;
    }
    this.penDown = false;
    this.clearPen();
    this.deleteThisClone();
  }

  *tick() {
    this.vars.speedY += -0.5;
    this.costume = "ball";
    this.x += this.vars.speedX;
    this.y += this.vars.speedY;
    if (!this.touching(this.sprites["Level"].andClones())) {
      return;
    }
    while (!!this.touching(this.sprites["Level"].andClones())) {
      this.x += this.vars.speedX * -0.025;
      this.y += this.vars.speedY * -0.025;
    }
    this.warp(this.findNormal)();
    this.warp(this.bounce)(
      Math.sin(this.degToRad(this.vars.dir)),
      Math.cos(this.degToRad(this.vars.dir))
    );
    this.costume = "ball";
    for (let i = 0; i < 10; i++) {
      this.x += 0.5 * Math.sin(this.degToRad(this.vars.dir));
      this.y += 0.5 * Math.cos(this.degToRad(this.vars.dir));
      if (!this.touching(this.sprites["Level"].andClones())) {
        return;
      }
    }
    this.deleteThisClone();
  }

  *findNormal() {
    this.costume = "normal";
    this.vars.dir = 0;
    this.direction = this.vars.dir;
    if (this.touching(this.sprites["Level"].andClones())) {
      while (!!this.touching(this.sprites["Level"].andClones())) {
        this.warp(this.rotate)(15);
      }
      this.vars.dirStart = this.vars.dir - 15;
    } else {
      while (!this.touching(this.sprites["Level"].andClones())) {
        this.warp(this.rotate)(-15);
      }
      this.vars.dirStart = this.vars.dir;
      this.vars.dir = 0;
      this.direction = this.vars.dir;
    }
    while (!this.touching(this.sprites["Level"].andClones())) {
      this.warp(this.rotate)(15);
    }
    this.vars.dir = (this.vars.dir + this.vars.dirStart) / 2;
  }

  *rotate(by) {
    this.vars.dir += by;
    this.direction = this.vars.dir;
  }

  *bounce(nx, ny) {
    this.vars.dotProduct = this.vars.speedX * nx + this.vars.speedY * ny;
    this.vars.speedX += -1.5 * (nx * this.vars.dotProduct);
    this.vars.speedY += -1.5 * (ny * this.vars.dotProduct);
  }
}
