import { System, State } from "..";

export const debug: System = {
  update: (state: State) => {
    console.debug("UPDATE", state);
  },
  init: (state: State) => {
    console.debug("INIT", state);
  }
}
