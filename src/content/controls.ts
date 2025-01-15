import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Component, Engine, State } from "..";

let orbitControls: OrbitControls;

export const controls: Component[] = [
  {
    onInit: (_: State, engine: Engine) => {
      orbitControls = new OrbitControls(
        engine.camera,
        engine.renderer.domElement
      );
    },
    onUpdate: () => {
      orbitControls.update();
    }
  },
];
