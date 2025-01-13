import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Component, query, System, World } from "..";

export type Renderable = Component & {
  object3d?: Object3D;
  rendered?: boolean;
}

export const isRenderable = (component: Component): component is Renderable => {
  return "object3d" in component;
}

export const renderer = new WebGLRenderer();
export const scene = new Scene();
export const camera = new PerspectiveCamera(
  90,                                     // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                    // Min render distance
  1000                                    // Max render distance
);

camera.position.z = 5;

const addMissingRenderable = (renderable: Renderable, scene: Scene) => {
  if (!renderable.rendered && renderable.object3d) {
    scene.add(renderable.object3d);
    renderable.rendered = true;
  }
}

export const render: System = {
  update: (world: World) => {
    const renderables = query(world, isRenderable);

    renderables.forEach((renderable) => {
      addMissingRenderable(renderable, scene);
    });

    renderer.render(scene, camera);
  },
  init: (world: World) => {
    const renderables = query(world, isRenderable);

    renderables.forEach((renderable) => {
      addMissingRenderable(renderable, scene);
    });
  }
}
