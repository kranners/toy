import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { ColliderDesc, RigidBodyDesc, World as RapierWorld } from "@dimforge/rapier3d";
import { Lifecycleable } from "../systems/lifecycle";
import { Interactive, isInteractive } from "../systems/base";
import { queryEntity, State } from "..";

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 0xfff00f, wireframe: true, });
const object3d = new Mesh(geometry, material);

const desc = ColliderDesc.cuboid(1, 1, 1);

const createRigidBody = (rapierWorld: RapierWorld) => {
  return rapierWorld.createRigidBody(
    RigidBodyDesc.dynamic().setTranslation(0.0, 5.0, 0.0)
  );
}

export const cube: [Interactive, Lifecycleable] = [
  {
    object3d,
    desc,
    createRigidBody,
  },
  {
    onUpdate: (state: State) => {
      const interactive = queryEntity(state, isInteractive, "cube");

      if (interactive === undefined) {
        return
      }
    },
  }
];

