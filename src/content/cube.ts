import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { ColliderDesc, RigidBodyDesc, World } from "@dimforge/rapier3d";
import { Interactive } from "../systems/base";

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const object3d = new Mesh(geometry, material);

const desc = ColliderDesc.cuboid(1, 1, 1);

const createRigidBody = (world: World) => {
  return world.createRigidBody(
    RigidBodyDesc.dynamic().setTranslation(0.00, 5.00, 0.00).setRotation({
      x: 0.5,
      y: 1.0,
      z: 1.5,
      w: 1.0
    })
  );
}

export const cube: Interactive = { object3d, desc, createRigidBody };

