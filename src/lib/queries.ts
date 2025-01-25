import { Component, Predicate, State } from "./types";

export function query<C extends Component>(
  state: State,
  predicate: Predicate<C>,
): (C & unknown)[] {
  return Object.values(state).filter(predicate);
}
