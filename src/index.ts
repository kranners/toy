import { debug } from "./systems/debug";
import { render } from "./systems/render";
import type { World } from "@dimforge/rapier3d";
import { tick } from "./systems/lifecycle";
import { physics } from "./systems/physics";
import { Camera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { state } from "./content";

export type Entity = number;

export type Component = Record<string, unknown>;

export type Predicate<C extends Component> = (component: Component) => component is C;

export type State = Record<Entity, Component[]>;

export type Engine = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;

  world: World;
}

export type System = {
  update: (state: State, engine: Engine) => void;
  init?: (state: State, engine: Engine) => void;
}

export function query<C extends Component>(state: State, predicate: Predicate<C>): C[] {
  const components = Object.values(state).flat();
  return components.filter(predicate);
}

import("@dimforge/rapier3d").then((rapier) => {
  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world = new rapier.World(gravity);

  const renderer = new WebGLRenderer();
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    90,                                     // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                    // Min render distance
    1000                                    // Max render distance
  );

  camera.position.z = 5;

  const engine: Engine = { renderer, scene, camera, world };
  const systems: System[] = [render, debug, tick, physics];

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  systems.forEach((system) => {
    if (system.init === undefined) {
      return;
    }

    system.init(state, engine);
  })

  renderer.setAnimationLoop(() => {
    systems.forEach((system) => {
      system.update(state, engine);
    })
  });
});

