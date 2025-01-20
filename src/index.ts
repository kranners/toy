import { tick } from "./systems/lifecycle";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { state } from "./content";
import { base } from "./systems/base";
import { resize } from "./systems/resize";
import { Engine, Rapier, System } from "./lib/types";
import { GRAVITY } from "./lib/constants";

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
      if (system.tick === undefined) {
        return;
      }

      system.tick(state, engine);
    })
  });
});

