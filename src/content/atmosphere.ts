import { HemisphereLight } from "three";
import { Renderable } from "../systems/render";

const object3d = new HemisphereLight(0xffffff, 0x000000, 0.6);

export const atmosphere: Renderable = { object3d };

