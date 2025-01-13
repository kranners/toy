import { System, World } from "..";

export const debug: System = {
  update: (world: World) => {
    console.debug("UPDATE", world);
  },
  init: (world: World) => {
    console.debug("INIT", world);
  }
}
