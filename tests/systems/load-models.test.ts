import { describe, expect, it } from "vitest";
import { HasModel, loadModels } from "../../src/systems/load-models";
import { testEngine } from "../../vitest.setup";

// Getting Vitest to load the GLB files is absolutely not worth writing tests
// for this thing for. idk why i even tried to write tests for this considering
// that they run in completely different tools smh
describe.skip("model loading system", () => {
  describe("given a state with a valid asset path", () => {
    const buildState = (): { box: HasModel } => ({
      box: { assetPath: "models/cone.glb" }
    });

    it("sets loaded to true", () => {
      const state = buildState();
      loadModels.init(state, testEngine);
      expect(state.box.loaded).toBeTruthy();
    });

    it("sets object3d to the model", () => {
      const state = buildState();
      loadModels.init(state, testEngine);
      expect(state.box.object3d).toBeDefined();
    });
  });
});

