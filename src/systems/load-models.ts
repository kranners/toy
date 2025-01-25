import { Vector3Like } from "three";
import { Component, Engine, State, System } from "../lib/types";
import { query } from "../lib/queries";
import { GLTF } from "three/examples/jsm/Addons";
import { Renderable } from "./render";

export type HasModel = Component & {
  assetPath: string;
  loaded?: boolean;

  renderOffset?: Vector3Like;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const isHasModel = (component: Component): component is HasModel => {
  return "assetPath" in component;
};

const loadAndSetModel = async (
  hasModel: HasModel,
  engine: Engine,
): Promise<HasModel & Renderable> => {
  return new Promise((resolve, reject) => {
    const onProgress = ({ loaded, total }: ProgressEvent) => {
      console.debug(`loaded ${loaded} out of ${total}`);
    };

    const onLoad = (data: GLTF) => {
      const { scene } = data;

      scene.traverse((object3d) => {
        object3d.castShadow = hasModel.castShadow ?? false;
        object3d.receiveShadow = hasModel.receiveShadow ?? false;
      });

      hasModel.object3d = scene;
      hasModel.loaded = true;
      resolve(hasModel as HasModel & Renderable);
    };

    engine.gltfLoader.load(hasModel.assetPath, onLoad, onProgress, reject);
  });
};

export const loadModels: System = {
  init: async (state: State, engine: Engine) => {
    const hasModels = query(state, isHasModel).filter(
      (hasModel) => !hasModel.loaded,
    );

    const loading = hasModels.map((hasNote) =>
      loadAndSetModel(hasNote, engine),
    );
    await Promise.all(loading);
  },
  tick: (state: State, engine: Engine) => {
    const hasModels = query(state, isHasModel).filter(
      (hasModel) => !hasModel.loaded,
    );
    hasModels.forEach((hasNote) => loadAndSetModel(hasNote, engine));
  },
} as const;
