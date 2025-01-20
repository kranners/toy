import { Component, Entity, Predicate, State } from "./types";

export function query<C extends Component>(
  state: State,
  predicate: Predicate<C>
): C[] {
  const components = Object.values(state).flat();
  return components.filter(predicate);
}

export function queryEntity<
  S extends State,
  C extends Component,
  E extends Entity,
>(
  state: S,
  predicate: Predicate<C>,
  entity: E,
): C | undefined {
  if (!(entity in state)) {
    return undefined;
  }

  return state[entity].find(predicate);
}

