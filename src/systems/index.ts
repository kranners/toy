import { System, World } from "..";
import { debug } from "./debug";
import { render } from "./render";
import { tick } from "./tick";

export const systems: System[] = [
  render,
  debug,
  tick,
];

export const update = (systems: System[], world: World) => {
  systems.forEach((system) => {
    system.update(world);
  })
};

export const init = (systems: System[], world: World) => {
  systems.forEach((system) => {
    if (system.init === undefined) {
      return;
    }

    system.init(world);
  })
}

