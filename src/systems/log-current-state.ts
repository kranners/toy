import { Engine, State, System } from "../lib/types";

let hasLoggedTick = false;
let hasLoggedInit = false;

export const logCurrentState: System = {
  tick: (state: State, engine: Engine) => {
    if (hasLoggedTick) {
      return;
    }

    hasLoggedTick = true;
    console.debug("Tick", state, engine);
  },
  init: (state: State, engine: Engine) => {
    if (hasLoggedInit) {
      return;
    }

    hasLoggedInit = true;
    console.debug("Init", state, engine);
  },
}
