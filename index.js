import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Tank from "./Tank/Tank.js";
import Ball from "./Ball/Ball.js";
import Level from "./Level/Level.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Tank: new Tank({
    x: 0,
    y: 0,
    direction: -53.13010235415598,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Ball: new Ball({
    x: 0,
    y: 0,
    direction: 165,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Level: new Level({
    x: -1,
    y: 6,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
