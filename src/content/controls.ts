import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Lifecycleable } from "../systems/lifecycle";
import { Engine, State } from "../lib/types";

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
