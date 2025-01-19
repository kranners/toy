import { Sky } from "three/examples/jsm/Addons";
import { Engine, GRAVITY, queryEntity } from "../..";
import { base, isInteractive } from "../base";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

let engine: Engine;

beforeAll(async () => {
  const renderer = new WebGLRenderer();
  const scene = new Scene();
  const camera = new PerspectiveCamera();

  const rapier = await import("@dimforge/rapier3d");
  const world = new rapier.World(GRAVITY);

  engine = { renderer, scene, camera, world };
});

describe("base system", () => {
  describe("given a state with a single object3d", () => {
    const state = {
      sky: [{ object3d: new Sky() }],
    };

    it("sets rendered to true", () => {
      base.init(state, engine);
      const interactive = queryEntity(state, isInteractive, "sky");

      if (interactive === undefined) {
        throw new Error("Interactive query failed!");
      }

      expect(interactive.rendered).toBeTruthy();
    });

    it.todo("adds the object3d to the scene");
  });
})
