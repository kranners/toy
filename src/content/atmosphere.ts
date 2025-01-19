import { HemisphereLight } from "three";
import { Interactive } from "../systems/base";

const object3d = new HemisphereLight(0xffffff, 0x000000, 0.6);

export const atmosphere: [Interactive] = [
  { object3d },
]

