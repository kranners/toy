import { describe, expect, it } from "vitest";
import { HasModel, loadModels } from "../../src/systems/load-models";
import { testEngine } from "../../vitest.setup";

const FAKE_MODEL_PATH = "cone.glb";

describe("model loading system", () => {
  describe("given a state with a valid asset path", () => {
    const buildState = (): { box: HasModel } => ({
      box: { assetPath: FAKE_MODEL_PATH },
    });

    it("sets loaded to true", () => {
      const state = buildState();
      loadModels.init(state, testEngine);
      expect(state.box.loaded).toBeTruthy();
    });

    it("calls the loader to load the model path", () => {
      const state = buildState();
      loadModels.init(state, testEngine);

      expect(testEngine.gltfLoader.load).toHaveBeenCalledWith(
        FAKE_MODEL_PATH,
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
