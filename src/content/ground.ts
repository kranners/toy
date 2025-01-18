import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import { ColliderDesc } from "@dimforge/rapier3d";
import { Interactive } from "../systems/base";

const geometry = new BoxGeometry(10, 10, 10);
const material = new MeshBasicMaterial({ color: 0x4f42b5, side: DoubleSide });
const object3d = new Mesh(geometry, material);

const desc = ColliderDesc.cuboid(10.0, 10.0, 10.0).setTranslation(0, -11.0, 0);

export const ground: [Interactive] = [
  {
    object3d,
    desc,
    renderOffset: new Vector3(0, 11 / 2, 0)
  },
];
