import { query } from "../lib/queries";
import { Component, State, System } from "../lib/types";

type StateMachine<T extends string> = Record<T, () => T>;

export type Stateful<T extends string> = Component & {
  currentState: T;
  stateMachine: StateMachine<T>;
};

function isStateful<T extends string>(
  component: Component,
): component is Stateful<T> {
  return "currentState" in component && "stateMachine" in component;
}

export const stateMachine: System = {
  tick: (state: State) => {
    const statefuls = query(state, isStateful);

    statefuls.forEach((stateful) => {
      stateful.currentState = stateful.stateMachine[stateful.currentState]();
    });
  },
  init: () => {
    // do nothing.
  },
};
