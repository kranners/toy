import { Component, query, System, World } from "..";

export type Tickable = Component & {
  onTick: (world: World) => void;
}

export const isTickable = (component: Component): component is Tickable => {
  return "onTick" in component;
}

export const tick: System = {
  update: (world: World) => {
    const tickables = query(world, isTickable);
    tickables.forEach((tickable) => {
      tickable.onTick(world);
    });
  }
}
