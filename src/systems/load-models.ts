import { Group, Vector3Like } from "three";
import { Component, State, System } from "../lib/types";
import { query } from "../lib/queries";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons";
import { Renderable } from "./render";

const loader = new GLTFLoader();

export type HasModel = Component & {
  assetPath: string;
  loaded?: boolean;

  renderOffset?: Vector3Like;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export const isHasModel = (component: Component): component is HasModel => {
  return "assetPath" in component;
}

const loadAndSetModel = async (hasModel: HasModel): Promise<HasModel & Renderable> => {
  return new Promise((resolve, reject) => {
    loader.load(
      hasModel.assetPath,
      (data: GLTF) => {
        const { scene } = data;

        scene.traverse((object3d) => {
          object3d.castShadow = hasModel.castShadow ?? false;
          object3d.receiveShadow = hasModel.receiveShadow ?? false;
        });

        hasModel.object3d = scene;
        hasModel.loaded = true;
        resolve(hasModel as HasModel & Renderable);
      },
      ({ loaded, total }) => console.debug(`loaded ${loaded} out of ${total}`),
      reject,
    )
  });
}

export const loadModels: System = {
  init: async (state: State) => {
    const hasModels = query(state, isHasModel).filter((hasModel) => !hasModel.loaded);

    const loading = hasModels.map(loadAndSetModel);
    await Promise.all(loading);
  },
  tick: (state: State) => {
    const hasModels = query(state, isHasModel).filter((hasModel) => !hasModel.loaded);
    hasModels.forEach(loadAndSetModel);
  }
} as const;

