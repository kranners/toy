import {
  ColliderDesc,
  DynamicRayCastVehicleController,
  RigidBodyDesc,
  World,
} from "@dimforge/rapier3d";
import { HasModel } from "../systems/load-models";
import { Physical } from "../systems/physics";
import { PRESSED_CONTROLS } from "../systems/controls";
import { Stateful } from "../systems/state-machine";
import { Lifecycleable } from "../systems/lifecycle";
import { Engine, State } from "../lib/types";

const desc = ColliderDesc.cuboid(0.85, 0.85, 0.85);

const createRigidBody = (world: World) => {
  return world.createRigidBody(
    RigidBodyDesc.dynamic().setTranslation(0.0, 1.0, 0.0).setRotation({
      x: 0.5,
      y: 1.0,
      z: 1.5,
      w: 1.0,
    }),
  );
};

type CubeState = "idle" | "accelerate" | "accelerateRight" | "accelerateLeft";

const processCubeControls = (): CubeState => {
  if (!PRESSED_CONTROLS.forward) {
    return "idle";
  }

  if (PRESSED_CONTROLS.right) {
    return "accelerateRight";
  }

  if (PRESSED_CONTROLS.left) {
    return "accelerateLeft";
  }

  return "accelerate";
};

let controller: DynamicRayCastVehicleController | undefined = undefined;

export const cube: Physical & HasModel & Stateful<CubeState> & Lifecycleable = {
  assetPath: "box.glb",
  desc,
  createRigidBody,
  currentState: "idle",
  onInit: (_: State, engine: Engine) => {
    if (cube.rigidBody) {
      controller = engine.world.createVehicleController(cube.rigidBody);
    }
  },
  onTick: (_, engine: Engine) => {
    controller.updateVehicle(1 / 60);

    if (cube.rigidBody === undefined) {
      return;
    }

    if (controller === undefined) {
      controller = engine.world.createVehicleController(cube.rigidBody);
    }

    controller.updateVehicle(engine.world.timestep);
    controller.addWheel();
  },
  stateMachine: {
    idle: (): CubeState => {
      return processCubeControls();
    },
    accelerate: (): CubeState => {
      return processCubeControls();
    },
    accelerateRight: (): CubeState => {
      return processCubeControls();
    },
    accelerateLeft: (): CubeState => {
      return processCubeControls();
    },
  },
};
