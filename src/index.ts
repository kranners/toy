import { tick } from "./systems/lifecycle";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { state } from "./content";
import { render } from "./systems/render";
import { resize } from "./systems/resize";
import { Engine, Rapier, System } from "./lib/types";
import { GRAVITY } from "./lib/constants";
import { loadModels } from "./systems/load-models";
import { physics } from "./systems/physics";
import { GLTFLoader } from "three/examples/jsm/Addons";

import("@dimforge/rapier3d").then(async (rapier: Rapier) => {
  if (document.body.children.length > 1) {
    return;
  }

  const world = new rapier.World(GRAVITY);

  const renderer = new WebGLRenderer();
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    90, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Min render distance
    1000, // Max render distance
  );
  const gltfLoader = new GLTFLoader();

  camera.position.set(3, 3, 3);

  const engine: Engine = { renderer, scene, camera, world, gltfLoader };
  const systems: System[] = [tick, render, resize, loadModels, physics];

  renderer.setSize(window.innerWidth, window.innerHeight, true);
  document.body.appendChild(renderer.domElement);

  const loadingSystems = systems.map(async (system) => {
    if (system.init === undefined) {
      return;
    }

    await system.init(state, engine);
  });

  await Promise.all(loadingSystems);

  renderer.setAnimationLoop(() => {
    systems.forEach((system) => {
      if (system.tick === undefined) {
        return;
      }

      system.tick(state, engine);
    });
  });
});
