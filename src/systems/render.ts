import { Object3D } from "three";
import { Component, Engine, State, System } from "../lib/types";
import { query } from "../lib/queries";

export type Renderable = Component & {
  object3d: Object3D;

  rendered?: boolean;
};

export const isRenderable = (component: Component): component is Renderable => {
  return "object3d" in component;
};

const addRenderableToScene = (renderable: Renderable, engine: Engine) => {
  if (renderable.rendered) {
    return;
  }

  engine.scene.add(renderable.object3d);
  renderable.rendered = true;
};

const addAllMissingRenderablesToScene = (state: State, engine: Engine) => {
  const renderables = query(state, isRenderable);

  renderables.forEach((renderable) => {
    addRenderableToScene(renderable, engine);
  });
};

export const render: System = {
  tick: (state: State, engine: Engine) => {
    addAllMissingRenderablesToScene(state, engine);
    engine.renderer.render(engine.scene, engine.camera);
  },
  init: addAllMissingRenderablesToScene,
} as const;
