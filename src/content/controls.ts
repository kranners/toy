import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Engine, State } from "..";
import { Lifecycleable } from "../systems/lifecycle";

let orbitControls: OrbitControls;

export const controls: [Lifecycleable] = [
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
