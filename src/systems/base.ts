import { Component, query, System, State, Engine } from "..";
import type { ColliderDesc, RigidBody, World as RapierWorld } from "@dimforge/rapier3d";
import { Object3D, Quaternion, Vector3Like } from "three";

export type Interactive = Component & {
  object3d: Object3D;
  desc?: ColliderDesc;
  renderOffset?: Vector3Like;

  createRigidBody?: (rapierWorld: RapierWorld) => RigidBody;
  rigidBody?: RigidBody;

  simulated?: boolean;
  rendered?: boolean;
};

export const isInteractive = (component: Component): component is Interactive => {
  return "object3d" in component;
}

const getRigidBody = (interactive: Interactive, engine: Engine): RigidBody | undefined => {
  if (!interactive.rigidBody && interactive.createRigidBody) {
    interactive.rigidBody = interactive.createRigidBody(engine.world);
  }

  return interactive.rigidBody;
}

const addMissingInteractive = (interactive: Interactive, engine: Engine) => {
  if (!interactive.rendered && interactive.object3d) {
    const { x, y, z } = interactive.desc.translation;
    const { renderOffset = { x: 0, y: 0, z: 0 } } = interactive;

    interactive.object3d.position.set(x, y, z).add(renderOffset);

    const { x: rotationX, y: rotationY, z: rotationZ, w: rotationW } = interactive.desc.rotation;
    interactive.object3d.rotation.setFromQuaternion(new Quaternion(rotationX, rotationY, rotationZ, rotationW));

    engine.scene.add(interactive.object3d);

    interactive.rendered = true;
  }

  if (!interactive.simulated && interactive.desc) {
    const rigidBody = getRigidBody(interactive, engine);
    engine.world.createCollider(interactive.desc, rigidBody);

    interactive.simulated = true;
  }
}

const syncInteractivePosition = (interactive: Interactive): void => {
  if (interactive.rigidBody === undefined || interactive.object3d === undefined) {
    return;
  }

  const { x, y, z } = interactive.rigidBody.translation();
  const { renderOffset = { x: 0, y: 0, z: 0 } } = interactive;


  interactive.object3d.position.set(x, y, z).add(renderOffset);

  const { x: rotationX, y: rotationY, z: rotationZ, w: rotationW } = interactive.rigidBody.rotation();
  interactive.object3d.rotation.setFromQuaternion(new Quaternion(rotationX, rotationY, rotationZ, rotationW));
}

type BaseSystem = System & {
  update: (state: State, engine: Engine) => void;
  init: (state: State, engine: Engine) => void;
};

// Handles rendering and physics. Naming things is hard.
export const base: BaseSystem = {
  update: (state: State, engine: Engine) => {
    engine.world.step();

    const interactives = query(state, isInteractive);

    interactives.forEach((interactive) => {
      addMissingInteractive(interactive, engine);
      syncInteractivePosition(interactive);
    });

    engine.renderer.render(engine.scene, engine.camera);
  },
  init: (state: State, engine: Engine) => {
    const interactives = query(state, isInteractive);

    interactives.forEach((interactive) => {
      addMissingInteractive(interactive, engine);
    })
  },
} as const;
