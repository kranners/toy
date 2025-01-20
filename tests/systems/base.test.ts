import { describe, expect, it } from "vitest";
import { base, Interactive } from "../../src/systems/base";
import { testEngine } from "../../vitest.setup";
import { TEST_CUBE_COLLIDER, TEST_CUBE_MESH, TEST_SKY, runTicks } from "../resources";

describe("base system", () => {
  // describe("given a state with a rigid body", () => {
  // it("falls down after an update", () => {
  //   const state = buildState();
  //   base.init(state, testEngine);
  //
  //   const startingPosition = state.cube[0].object3d.position;
  //   runTicks(base, state, testEngine);
  //
  //   const endingPosition = state.cube[0].object3d.position;
  //   expect(endingPosition.y).toBeGreaterThan(startingPosition.y);
  // });
  // });

  describe("given a state with a collider desc", () => {
    const buildState = () => ({
      cube: [{ object3d: TEST_CUBE_MESH, desc: TEST_CUBE_COLLIDER } as Interactive],
    });

    it("sets cube rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.cube[0].rendered).toBeTruthy();
    });

    it("adds the cube to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });

    it("sets cube simulated to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.cube[0].simulated).toBeTruthy();
    });
  })

  describe("given a state with a single object3d", () => {
    const buildState = () => ({
      sky: [{ object3d: TEST_SKY } as Interactive],
    });

    it("sets sky rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.sky[0].rendered).toBeTruthy();
    });

    it("adds the sky to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  });
});
