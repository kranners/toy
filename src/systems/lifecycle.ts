import { Component, query, System, State, Engine } from "..";

export type Lifecycleable = Component & {
  onInit?: (state: State, engine: Engine) => void;
  onUpdate: (state: State, engine: Engine) => void;
}

export const isLifecycleable = (component: Component): component is Lifecycleable => {
  return "onUpdate" in component;
}

export const tick: System = {
  update: (state: State, engine: Engine) => {
    const tickables = query(state, isLifecycleable);
    tickables.forEach((tickable) => {
      tickable.onUpdate(state, engine);
    });
  },
  init: (state: State, engine: Engine) => {
    const tickables = query(state, isLifecycleable);
    tickables.forEach((tickable) => {
      tickable.onInit?.(state, engine);
    });
  }
}
