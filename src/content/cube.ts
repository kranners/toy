import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { Component } from "..";
import { ColliderDesc, RigidBodyDesc, World as RapierWorld } from "@dimforge/rapier3d";

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, });
const object3d = new Mesh(geometry, material);

const desc = ColliderDesc.cuboid(1, 1, 1);

const getRigidBody = (rapierWorld: RapierWorld) => {
  rapierWorld.createRigidBody(
    RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0)
  );
}

export const cube: Component[] = [
  { object3d },
  {
    desc,
    getRigidBody,
  }
];

