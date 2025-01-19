import type { World } from "@dimforge/rapier3d";
import { tick } from "./systems/lifecycle";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { state } from "./content";
import { base } from "./systems/base";
import { resize } from "./systems/resize";
import { logCurrentState } from "./systems/log-current-state";

export type Entity = string;

export type Component = Record<string, unknown>;

export type Predicate<C extends Component> = (component: Component) => component is C;

export type State = Record<Entity, Component[]>;

export type Engine = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;

  world: World;
}

export type System = {
  update?: (state: State, engine: Engine) => void;
  init?: (state: State, engine: Engine) => void;
}

export function query<C extends Component>(
  state: State,
  predicate: Predicate<C>
): C[] {
  const components = Object.values(state).flat();
  return components.filter(predicate);
}

export function queryEntity<
  S extends State,
  C extends Component,
  E extends Entity,
>(
  state: S,
  predicate: Predicate<C>,
  entity: E,
): C | undefined {
  if (!(entity in state)) {
    return undefined;
  }

  return state[entity].find(predicate);
}

export type Rapier = typeof import("@dimforge/rapier3d");
export const GRAVITY = { x: 0.0, y: -9.81, z: 0.0 };

import("@dimforge/rapier3d").then((rapier: Rapier) => {
  if (document.body.children.length > 1) {
    return;
  }

  const world = new rapier.World(GRAVITY);

  const renderer = new WebGLRenderer();
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    90,                                     // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                    // Min render distance
    1000                                    // Max render distance
  );

  camera.position.set(3, 3, 3);

  const engine: Engine = { renderer, scene, camera, world };
  const systems: System[] = [tick, base, resize];

  renderer.setSize(window.innerWidth, window.innerHeight, true);
  document.body.appendChild(renderer.domElement);

  systems.forEach((system) => {
    if (system.init === undefined) {
      return;
    }

    system.init(state, engine);
  })

  renderer.setAnimationLoop(() => {
    systems.forEach((system) => {
      if (system.update === undefined) {
        return;
      }

      system.update(state, engine);
    })
  });
});

