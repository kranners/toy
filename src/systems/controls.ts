import { System } from "../lib/types";

export const PRESSED_KEYS: Record<string, boolean> = {};

const setKeyState = (to: boolean) => {
  return (event: KeyboardEvent) => {
    PRESSED_KEYS[event.key] = to;
  };
};

export const controls: System = {
  tick() {
    // do nothing.
  },
  init() {
    document.addEventListener("keydown", setKeyState(true));
    document.addEventListener("keyup", setKeyState(false));
  },
};
