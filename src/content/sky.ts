import { Sky } from "three/examples/jsm/Addons";
import { Interactive } from "../systems/base";
import { MathUtils, Vector3 } from "three";

// Straight up yoinked from the documentation
const object3d = new Sky();
object3d.scale.setScalar(45_000);

const phi = MathUtils.degToRad(90);
const theta = MathUtils.degToRad(180);
const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

object3d.material.uniforms.sunPosition.value = sunPosition;


export const sky: [Interactive] = [
  { object3d },
]
