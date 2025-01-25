import { World } from "@dimforge/rapier3d";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons";

export type Entity = string;

export type Component = Record<string, unknown>;

export type Predicate<C extends Component> = (
  component: Component,
) => component is C;

export type State = Record<Entity, Component>;

export type Engine = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;

  world: World;
  gltfLoader: GLTFLoader;
};

export type System = {
  init: (state: State, engine: Engine) => void | Promise<void>;
  tick: (state: State, engine: Engine) => void;
};

export type Rapier = typeof import("@dimforge/rapier3d");
