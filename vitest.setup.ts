import { afterEach, beforeAll, beforeEach } from "vitest";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Engine, Rapier } from "./src/lib/types";
import { GRAVITY } from "./src/lib/constants";

export let testEngine: Engine;

beforeAll(async () => {
  const rapier: Rapier = await import("@dimforge/rapier3d");

  const world = new rapier.World(GRAVITY);

  const renderer = new WebGLRenderer();
  renderer.setSize(300, 300);

  const scene = new Scene();
  const camera = new PerspectiveCamera(90);

  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);

  testEngine = { renderer, scene, camera, world };

  const existingCanvas = document.body.querySelector("canvas");

  if (existingCanvas !== null) {
    document.body.removeChild(existingCanvas);
  }

  document.body.appendChild(renderer.domElement);
});

beforeEach(() => {
  testEngine = { ...testEngine, scene: new Scene() };
});

afterEach(() => {
  testEngine.renderer.render(testEngine.scene, testEngine.camera);
});

