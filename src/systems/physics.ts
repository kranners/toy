import { ColliderDesc, RigidBody, Rotation, Vector, World } from "@dimforge/rapier3d";
import { Component, Engine, State, System } from "../lib/types";
import { Quaternion, Vector3Like } from "three";
import { isRenderable, Renderable } from "./render";
import { query } from "../lib/queries";

export type Physical = Component & {
  desc: ColliderDesc;
  renderOffset?: Vector3Like;

  createRigidBody?: (world: World) => RigidBody;
  rigidBody?: RigidBody;
  simulated?: boolean;
}

export const isPhysical = (component: Component): component is Physical => {
  return "desc" in component || "createRigidBody" in component;
}

const isPhysicalAndRenderable = (component: Component): component is Physical & Renderable => {
  return isPhysical(component) && isRenderable(component);
}

const getRigidBody = (physical: Physical, engine: Engine): RigidBody | undefined => {
  if (!physical.rigidBody && physical.createRigidBody) {
    physical.rigidBody = physical.createRigidBody(engine.world);
  }

  return physical.rigidBody;
}

const addPhysicalToWorld = (physical: Physical, engine: Engine) => {
  if (physical.simulated) {
    return;
  }

  if (physical.desc) {
    const rigidBody = getRigidBody(physical, engine);
    engine.world.createCollider(physical.desc, rigidBody);

    physical.simulated = true;
  }
}

export const getPhysicalPosition = (physical: Physical): [Vector, Rotation] | undefined => {
  if (physical.desc === undefined) {
    return;
  }

  if (physical.rigidBody === undefined) {
    return [physical.desc.translation, physical.desc.rotation];
  }

  return [physical.rigidBody.translation(), physical.rigidBody.rotation()];
}

const syncPhysicsAndRenderedPositions = (physical: Physical) => {
  if (!isPhysicalAndRenderable(physical)) {
    return;
  }

  const position = getPhysicalPosition(physical);

  if (position === undefined) {
    return;
  }

  const [translation, rotation] = position;

  const { x: translationX, y: translationY, z: translationZ } = translation;
  const { x: rotationX, y: rotationY, z: rotationZ, w: rotationW } = rotation;

  const { renderOffset = { x: 0, y: 0, z: 0 } } = physical;

  physical.object3d.position.set(translationX, translationY, translationZ).add(renderOffset);
  physical.object3d.rotation.setFromQuaternion(new Quaternion(rotationX, rotationY, rotationZ, rotationW));
}

const addAndSyncAllPhysicals = (state: State, engine: Engine) => {
  const physicals = query(state, isPhysical);
  physicals.forEach((physical) => {
    addPhysicalToWorld(physical, engine);
    syncPhysicsAndRenderedPositions(physical);
  });
}

export const physics: System = {
  tick: (state: State, engine: Engine) => {
    addAndSyncAllPhysicals(state, engine);
    engine.world.step();
  },
  init: addAndSyncAllPhysicals,
}

