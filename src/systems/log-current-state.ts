import { System, State, Engine } from "..";

let hasLoggedUpdate = false;
let hasLoggedInit = false;

export const logCurrentState: System = {
  update: (state: State, engine: Engine) => {
    if (hasLoggedUpdate) {
      return;
    }

    hasLoggedUpdate = true;
    console.debug("Update", state, engine);
  },
  init: (state: State, engine: Engine) => {
    if (hasLoggedInit) {
      return;
    }

    hasLoggedInit = true;
    console.debug("Init", state, engine);
  },
}
