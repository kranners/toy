import type { ColliderDesc, RigidBody, World as RapierWorld } from "@dimforge/rapier3d";
import { Component, query, System, World } from "..";

export type Collidable = {
  desc?: ColliderDesc;
  parent?: RigidBody;
  simulated?: boolean;
}

export const isCollidable = (component: Component): component is Collidable => {
  return "desc" in component;
}

const gravity = { x: 0.0, y: -9.81, z: 0.0 };

const rapier = await import("@dimforge/rapier3d");
export const rapierWorld = new rapier.World(gravity);

// const syncInteractablePosition = (interactable: Interactable): void => {
//   if (interactable.desc === undefined || interactable.object3d === undefined) {
//     return;
//   }
//
//   const { x, y, z } = interactable.desc.translation;
//   interactable.object3d.position.set(x, y, z);
// }

export const physics: System = {
  update: (world: World) => {
    const collidables = query(world, isCollidable);

    rapierWorld.step();
  },
  init: (world: World) => { /* ... */ }
}
