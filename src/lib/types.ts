import { World } from "@dimforge/rapier3d";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export type Entity = string;

export type Component = Record<string, unknown>;

export type Predicate<C extends Component> = (component: Component) => component is C;

export type State = Record<Entity, Component>;

export type Engine = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;

  world: World;
}

export type System = {
  tick?: (state: State, engine: Engine) => void;
  init?: (state: State, engine: Engine) => void;
}

export type Rapier = typeof import("@dimforge/rapier3d");
