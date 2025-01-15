import type { ColliderDesc, RigidBody, World as RapierWorld } from "@dimforge/rapier3d";
import { Component, query, System } from "..";

export type Collidable = {
  desc?: ColliderDesc;
  getRigidBody?: (rapierWorld: RapierWorld) => RigidBody;

  simulated?: boolean;
}

export const isCollidable = (component: Component): component is Collidable => {
  return "desc" in component;
}

// const syncInteractablePosition = (interactable: Interactable): void => {
//   if (interactable.desc === undefined || interactable.object3d === undefined) {
//     return;
//   }
//
//   const { x, y, z } = interactable.desc.translation;
//   interactable.object3d.position.set(x, y, z);
// }

export const physics: System = {
  update: (_, engine) => {
    engine.world.step();
  },
  init: (state, engine) => {
    const collidables = query(state, isCollidable);

    collidables.forEach((collidable) => {
      if (!collidable.desc || collidable.simulated) {
        return;
      }

      const rigidBody = collidable.getRigidBody?.(engine.world);

      engine.world.createCollider(collidable.desc, rigidBody);
    })
  }
}
