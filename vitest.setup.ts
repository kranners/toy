import { afterEach, beforeAll, beforeEach, vi } from "vitest";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Engine, Rapier } from "./src/lib/types";
import { GRAVITY } from "./src/lib/constants";
import { GLTFLoader } from "three/examples/jsm/Addons";

export let testEngine: Engine;

const mockOnLoad = vi.fn((_: string, onLoad: (data: unknown) => void) => {
  const mockModelData = { scene: { traverse: vi.fn() } };
  onLoad(mockModelData);
});

beforeAll(async () => {
  const rapier: Rapier = await import("@dimforge/rapier3d");

  const world = new rapier.World(GRAVITY);

  const renderer = new WebGLRenderer();
  renderer.setSize(300, 300);

  const scene = new Scene();
  const camera = new PerspectiveCamera(90);

  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);

  const gltfLoader = { load: mockOnLoad } as unknown as GLTFLoader;

  testEngine = { renderer, scene, camera, world, gltfLoader };

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
  vi.clearAllMocks();
});

