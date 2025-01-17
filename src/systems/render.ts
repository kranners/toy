import { Object3D, Scene } from "three";
import { Component, query, System, State, Engine } from "..";

export type Renderable = Component & {
  object3d?: Object3D;
  rendered?: boolean;
}

export const isRenderable = (component: Component): component is Renderable => {
  return "object3d" in component;
}

const addMissingRenderable = (renderable: Renderable, scene: Scene) => {
  if (!renderable.rendered && renderable.object3d) {
    scene.add(renderable.object3d);
    renderable.rendered = true;
  }
}

export const render: System = {
  update: (state: State, engine: Engine) => {
    const renderables = query(state, isRenderable);

    renderables.forEach((renderable) => {
      addMissingRenderable(renderable, engine.scene);
    });

    engine.renderer.render(engine.scene, engine.camera);
  },
  init: (state: State, engine: Engine) => {
    const renderables = query(state, isRenderable);

    renderables.forEach((renderable) => {
      addMissingRenderable(renderable, engine.scene);
    });
  }
}
