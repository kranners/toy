import { ColliderDesc } from "@dimforge/rapier3d";
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { Sky } from "three/examples/jsm/Addons";
import { Engine, State, System } from "../../src/lib/types";

export const TEST_MATERIAL = new MeshBasicMaterial({ color: 0xab58e6, wireframe: true });
export const TEST_CUBE_MESH = new Mesh(new BoxGeometry(), TEST_MATERIAL);
export const TEST_CUBE_COLLIDER = ColliderDesc.cuboid(1, 1, 1);

export const TEST_SKY = new Sky();
TEST_SKY.scale.setScalar(45_000);
const sunPosition = new Vector3().setFromSphericalCoords(1, Math.PI / 2, Math.PI);
TEST_SKY.material.uniforms.sunPosition.value = sunPosition;
TEST_SKY.up = new Vector3(0, 0.5, 0);

export const runTicks = (system: System, state: State, engine: Engine, count: number = 50) => {
  for (let iteration = 0; iteration < count; iteration++) {
    system.tick?.(state, engine);
  }
}

