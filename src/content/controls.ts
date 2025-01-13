import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Component } from "..";
import { camera, renderer } from "../systems/render";

const orbitControls = new OrbitControls(camera, renderer.domElement);

export const controls: Component[] = [
  {
    onTick: () => {
      orbitControls.update();
    }
  }
];
