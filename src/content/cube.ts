import { ColliderDesc, RigidBodyDesc, World } from "@dimforge/rapier3d";
import { HasModel } from "../systems/load-models";
import { Physical } from "../systems/physics";

const desc = ColliderDesc.cuboid(0.85, 0.85, 0.85);

const createRigidBody = (world: World) => {
  return world.createRigidBody(
    RigidBodyDesc.dynamic().setTranslation(0.0, 5.0, 0.0).setRotation({
      x: 0.5,
      y: 1.0,
      z: 1.5,
      w: 1.0,
    }),
  );
};

export const cube: Physical & HasModel = {
  assetPath: "box.glb",
  desc,
  createRigidBody,
};
