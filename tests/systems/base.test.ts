import { describe, expect, it } from "vitest";
import { base, Interactive } from "../../src/systems/base";
import { testEngine } from "../../vitest.setup";
import { CREATE_TEST_CUBE_RIGID_BODY, TEST_CUBE_COLLIDER, TEST_CUBE_MESH, TEST_SKY, runTicks } from "../resources";

describe("base system", () => {
  describe("given a state with a rigid body", () => {
    const buildState = (): { cube: Interactive } => ({
      cube: {
        object3d: TEST_CUBE_MESH,
        desc: TEST_CUBE_COLLIDER,
        createRigidBody: CREATE_TEST_CUBE_RIGID_BODY,
      },
    });

    it("falls down after an update", () => {
      const state = buildState();
      base.init(state, testEngine);

      const { y: startingY } = state.cube.object3d.position;
      runTicks(base, state, testEngine);
      const { y: endingY } = state.cube.object3d.position;

      expect(startingY).toBeGreaterThan(endingY);
    });

    it("sets rigidBody after init", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.cube.rigidBody).toBeDefined();
    })
  });

  describe("given a state with a collider desc", () => {
    const buildState = (): { cube: Interactive } => ({
      cube: {
        object3d: TEST_CUBE_MESH,
        desc: TEST_CUBE_COLLIDER,
      },
    });

    it("sets cube rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.cube.rendered).toBeTruthy();
    });

    it("adds the cube to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });

    it("sets cube simulated to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.cube.simulated).toBeTruthy();
    });
  })

  describe("given a state with a single object3d", () => {
    const buildState = (): { sky: Interactive } => ({
      sky: {
        object3d: TEST_SKY,
      },
    });

    it("sets sky rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);
      expect(state.sky.rendered).toBeTruthy();
    });

    it("adds the sky to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  });
});
