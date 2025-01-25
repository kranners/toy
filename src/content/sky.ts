import { Sky } from "three/examples/jsm/Addons";
import { Renderable } from "../systems/render";
import { Vector3 } from "three";

// Straight up yoinked from the documentation
const object3d = new Sky();
object3d.scale.setScalar(45_000);

const sunPosition = new Vector3().setFromSphericalCoords(
  1,
  Math.PI / 2,
  Math.PI,
);

object3d.material.uniforms.sunPosition.value = sunPosition;

export const sky: Renderable = { object3d };
