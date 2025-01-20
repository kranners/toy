import { describe, expect, it } from "vitest";
import { base, Interactive, isInteractive } from "../../src/systems/base";
import { testEngine } from "../../vitest.setup";
import { queryEntity } from "../../src/lib/queries";
import { TEST_CUBE_COLLIDER, TEST_CUBE_MESH, TEST_SKY } from "../resources";

describe("base system", () => {
  describe("given a state with a collider desc", () => {
    const buildState = () => ({
      cube: [{ object3d: TEST_CUBE_MESH, desc: TEST_CUBE_COLLIDER }],
    });

    it("sets cube rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);

      const interactive = queryEntity(state, isInteractive, "cube") as Interactive;
      expect(interactive.rendered).toBeTruthy();
    });

    it("adds the cube to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  })

  describe("given a state with a single object3d", () => {
    const buildState = () => ({
      sky: [{ object3d: TEST_SKY }],
    });

    it("sets sky rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);

      const interactive = queryEntity(state, isInteractive, "sky") as Interactive;
      expect(interactive.rendered).toBeTruthy();
    });

    it("adds the sky to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  });
});
