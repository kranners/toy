import { describe, expect, it } from "vitest";
import { render, Renderable } from "../../src/systems/render";
import { testEngine } from "../../vitest.setup";
import { TEST_SKY } from "../resources";

describe("rendering system", () => {
  describe("given a state with a single object3d", () => {
    const buildState = (): { sky: Renderable } => ({
      sky: {
        object3d: TEST_SKY,
      },
    });

    it("sets sky rendered to true", () => {
      const state = buildState();
      render.init(state, testEngine);
      expect(state.sky.rendered).toBeTruthy();
    });

    it("adds the sky to the scene", () => {
      render.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  });
});
