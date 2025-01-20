import { Sky } from "three/examples/jsm/Addons";
import { describe, expect, it } from "vitest";
import { base, Interactive, isInteractive } from "../../src/systems/base";
import { testEngine } from "../../vitest.setup";
import { queryEntity } from "../../src/lib/queries";
import { Vector3 } from "three";

describe("base system", () => {
  describe("given a state with a single object3d", () => {
    const buildState = () => {
      const object3d = new Sky();
      const sunPosition = new Vector3().setFromSphericalCoords(1, Math.PI / 2, Math.PI);
      object3d.material.uniforms.sunPosition.value = sunPosition;
      object3d.up = new Vector3(0, 0.5, 0);

      return { sky: [{ object3d }] };
    };

    it("sets rendered to true", () => {
      const state = buildState();
      base.init(state, testEngine);

      const interactive = queryEntity(state, isInteractive, "sky") as Interactive;
      expect(interactive.rendered).toBeTruthy();
    });

    it("adds the object3d to the scene", () => {
      base.init(buildState(), testEngine);
      expect(testEngine.scene.children).toHaveLength(1);
    });
  });
})
