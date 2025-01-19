import { Sky } from "three/examples/jsm/Addons";
import { Interactive } from "../systems/base";

// Straight up yoinked from the documentation
export const object3d = new Sky();
object3d.scale.setScalar(450000);

export const sky: [Interactive] = [
  { object3d },
]
