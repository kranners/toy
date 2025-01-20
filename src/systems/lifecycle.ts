import { query } from "../lib/queries";
import { Component, Engine, State, System } from "../lib/types";

export type Lifecycleable = Component & {
  onInit?: (state: State, engine: Engine) => void;
  onTick: (state: State, engine: Engine) => void;
}

export const isLifecycleable = (component: Component): component is Lifecycleable => {
  return "onTick" in component;
}

export const tick: System = {
  tick: (state: State, engine: Engine) => {
    const tickables = query(state, isLifecycleable);
    tickables.forEach((tickable) => {
      tickable.onTick(state, engine);
    });
  },
  init: (state: State, engine: Engine) => {
    const tickables = query(state, isLifecycleable);
    tickables.forEach((tickable) => {
      tickable.onInit?.(state, engine);
    });
  }
}
