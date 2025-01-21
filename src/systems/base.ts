import type { ColliderDesc, RigidBody, Vector, Rotation, World } from "@dimforge/rapier3d";
import { Object3D, Quaternion, Vector3Like } from "three";
import { Component, Engine, State, System } from "../lib/types";
import { query } from "../lib/queries";

export type Interactive = Component & {
  object3d: Object3D;
  desc?: ColliderDesc;
  renderOffset?: Vector3Like;

  createRigidBody?: (world: World) => RigidBody;
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
    syncInteractivePosition(interactive);

    engine.scene.add(interactive.object3d);
    interactive.rendered = true;
  }

  if (!interactive.simulated && interactive.desc) {
    const rigidBody = getRigidBody(interactive, engine);
    engine.world.createCollider(interactive.desc, rigidBody);

    interactive.simulated = true;
  }
}

const getInteractivePhysicsPosition = (interactive: Interactive): [Vector, Rotation] | undefined => {
  if (interactive.desc === undefined) {
    return;
  }

  if (interactive.rigidBody === undefined) {
    return [interactive.desc.translation, interactive.desc.rotation];
  }

  return [interactive.rigidBody.translation(), interactive.rigidBody.rotation()];
}

const syncInteractivePosition = (interactive: Interactive): void => {
  if (interactive.object3d === undefined) {
    return;
  }

  const position = getInteractivePhysicsPosition(interactive);

  if (position === undefined) {
    return;
  }

  const [translation, rotation] = position;

  const { x: translationX, y: translationY, z: translationZ } = translation;
  const { x: rotationX, y: rotationY, z: rotationZ, w: rotationW } = rotation;

  const { renderOffset = { x: 0, y: 0, z: 0 } } = interactive;

  interactive.object3d.position.set(translationX, translationY, translationZ).add(renderOffset);
  interactive.object3d.rotation.setFromQuaternion(new Quaternion(rotationX, rotationY, rotationZ, rotationW));
}

type BaseSystem = System & {
  tick: (state: State, engine: Engine) => void;
  init: (state: State, engine: Engine) => void;
};

// Handles rendering and physics. Naming things is hard.
export const base: BaseSystem = {
  tick: (state: State, engine: Engine) => {
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
