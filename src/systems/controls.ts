import { System } from "../lib/types";

const CONTROLS = {
  FORWARD: "forward",
  RIGHT: "right",
  LEFT: "left",
  JUMP: "jump",
} as const;

export type Control = (typeof CONTROLS)[keyof typeof CONTROLS];

export const PRESSED_KEYS: Record<string, boolean> = {};
export const PRESSED_CONTROLS: Partial<Record<Control, boolean>> = {};

export const KEYS_TO_CONTROLS: Record<string, Control> = {
  w: CONTROLS.FORWARD,
  d: CONTROLS.RIGHT,
  a: CONTROLS.LEFT,
  Space: CONTROLS.JUMP,
};

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
