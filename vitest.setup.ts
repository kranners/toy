import { afterEach, beforeAll, beforeEach } from "vitest";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Engine, Rapier } from "./src/lib/types";
import { GRAVITY } from "./src/lib/constants";

export let testEngine: Engine;

beforeAll(async () => {
  const rapier: Rapier = await import("@dimforge/rapier3d");

  const world = new rapier.World(GRAVITY);

  const { clientWidth: width, clientHeight: height } = document.body;

  const renderer = new WebGLRenderer();
  renderer.setSize(width, height);

  const scene = new Scene();
  const camera = new PerspectiveCamera(90, width / height);

  testEngine = { renderer, scene, camera, world };

  const existingCanvas = document.body.querySelector("canvas");

  if (existingCanvas !== null) {
    document.body.removeChild(existingCanvas);
  }

  document.body.appendChild(renderer.domElement);
});

beforeEach(() => {
  testEngine.scene = new Scene();
});

afterEach(() => {
  testEngine.renderer.render(testEngine.scene, testEngine.camera);
});

