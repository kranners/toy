import { describe, expect, it } from "vitest";
import {
  CREATE_TEST_CUBE_RIGID_BODY,
  runTicks,
  TEST_CUBE_COLLIDER,
  TEST_CUBE_MESH,
} from "../resources";
import {
  getPhysicalPosition,
  Physical,
  physics,
} from "../../src/systems/physics";
import { testEngine } from "../../vitest.setup";
import { Rotation, Vector } from "@dimforge/rapier3d";
import { render, Renderable } from "../../src/systems/render";
import { Quaternion } from "three";

describe("physics system", () => {
  describe("given a state with a collider desc", () => {
    const buildState = (): { cube: Physical } => ({
      cube: { desc: TEST_CUBE_COLLIDER },
    });

    it("adds the cube to the world", () => {
      physics.init(buildState(), testEngine);
      expect(testEngine.world.colliders.len()).toBe(1);
    });

    it("sets cube simulated to true", () => {
      const state = buildState();
      physics.init(state, testEngine);
      expect(state.cube.simulated).toBeTruthy();
    });
  });

  describe("given a state with a rigid body", () => {
    const buildState = (): { cube: Physical } => ({
      cube: {
        desc: TEST_CUBE_COLLIDER,
        createRigidBody: CREATE_TEST_CUBE_RIGID_BODY,
      },
    });

    it("falls down after an update", () => {
      const state = buildState();
      physics.init(state, testEngine);

      const [startingPosition] = getPhysicalPosition(state.cube) as [
        Vector,
        Rotation,
      ];
      runTicks(physics, state, testEngine);
      const [endingPosition] = getPhysicalPosition(state.cube) as [
        Vector,
        Rotation,
      ];

      expect(startingPosition.y).toBeGreaterThan(endingPosition.y);
    });

    it("sets rigidBody after init", () => {
      const state = buildState();
      physics.init(state, testEngine);
      expect(state.cube.rigidBody).toBeDefined();
    });
  });
});

describe("physics system integrating with the rendering system", () => {
  describe("given a state with a desc and an object3d", () => {
    const buildState = (): { cube: Physical & Renderable } => ({
      cube: {
        desc: TEST_CUBE_COLLIDER,
        object3d: TEST_CUBE_MESH,
      },
    });

    it("syncs their position", () => {
      const state = buildState();
      render.init(state, testEngine);
      physics.init(state, testEngine);

      const {
        x: renderX,
        y: renderY,
        z: renderZ,
      } = state.cube.object3d.position;
      const {
        x: physicX,
        y: physicY,
        z: physicZ,
      } = state.cube.desc.translation;

      expect(renderX).toBeCloseTo(physicX);
      expect(renderY).toBeCloseTo(physicY);
      expect(renderZ).toBeCloseTo(physicZ);
    });

    it("syncs their rotation", () => {
      const state = buildState();
      render.init(state, testEngine);
      physics.init(state, testEngine);

      const {
        x: renderX,
        y: renderY,
        z: renderZ,
      } = state.cube.object3d.rotation;

      const {
        x: quarternionX,
        y: quarternionY,
        z: quarternionZ,
        w: quarternionW,
      } = state.cube.desc.rotation;

      const {
        x: physicX,
        y: physicY,
        z: physicZ,
      } = new Quaternion(
        quarternionX,
        quarternionY,
        quarternionZ,
        quarternionW,
      );

      expect(renderX).toBeCloseTo(physicX);
      expect(renderY).toBeCloseTo(physicY);
      expect(renderZ).toBeCloseTo(physicZ);
    });
  });

  describe("given a state with a rigid body and an object3d", () => {
    const buildState = (): { cube: Physical & Renderable } => ({
      cube: {
        desc: TEST_CUBE_COLLIDER,
        object3d: TEST_CUBE_MESH,
        createRigidBody: CREATE_TEST_CUBE_RIGID_BODY,
      },
    });

    it("keeps their positions in sync", () => {
      const state = buildState();
      render.init(state, testEngine);
      physics.init(state, testEngine);

      runTicks(physics, state, testEngine);

      const {
        x: renderX,
        y: renderY,
        z: renderZ,
      } = state.cube.object3d.position;
      const {
        x: physicX,
        y: physicY,
        z: physicZ,
      } = state.cube.rigidBody?.translation() as Vector;

      expect(renderX).toBeCloseTo(physicX, 0);
      expect(renderY).toBeCloseTo(physicY, 0);
      expect(renderZ).toBeCloseTo(physicZ, 0);
    });

    it("keeps their rotations in sync", () => {
      const state = buildState();
      render.init(state, testEngine);
      physics.init(state, testEngine);

      runTicks(physics, state, testEngine);

      const {
        x: renderX,
        y: renderY,
        z: renderZ,
      } = state.cube.object3d.rotation;

      const {
        x: quarternionX,
        y: quarternionY,
        z: quarternionZ,
        w: quarternionW,
      } = state.cube.desc.rotation;

      const {
        x: physicX,
        y: physicY,
        z: physicZ,
      } = new Quaternion(
        quarternionX,
        quarternionY,
        quarternionZ,
        quarternionW,
      );

      expect(renderX).toBeCloseTo(physicX, 0);
      expect(renderY).toBeCloseTo(physicY, 0);
      expect(renderZ).toBeCloseTo(physicZ, 0);
    });
  });
});
