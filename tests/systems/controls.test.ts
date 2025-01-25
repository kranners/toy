import { describe, expect, it } from "vitest";
import {
  Control,
  controls,
  KEYS_TO_CONTROLS,
  PRESSED_CONTROLS,
  PRESSED_KEYS,
} from "../../src/systems/controls";
import { testEngine } from "../../vitest.setup";
import { userEvent } from "@vitest/browser/context";

const press = (key: string) => userEvent.keyboard(`{${key}>}`);
const release = (key: string) => userEvent.keyboard(`{/${key}}`);

describe("controls system", () => {
  controls.init({}, testEngine);

  it("sets a key to being pressed when it is pressed", async () => {
    press("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.a).toBeTruthy());
    release("a");
  });

  it("does not set a key to being pressed when it isn't", () => {
    press("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.b).toBeFalsy());
    release("a");
  });

  it("unsets a key when the key is released", () => {
    press("a");
    release("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.a).toBeFalsy());
  });

  it("does not unset a key when the key isn't released", () => {
    press("a");
    press("b");

    release("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.b).toBeTruthy());
    release("b");
  });

  it("sets the corresponding control when a key is pressed", () => {
    KEYS_TO_CONTROLS["a"] = "test" as Control;
    press("a");
    window.requestIdleCallback(() =>
      expect(PRESSED_CONTROLS["test" as Control]).toBeTruthy(),
    );
    release("a");
  });

  it("unsets the corresponding control when a key is released", () => {
    KEYS_TO_CONTROLS["a"] = "test" as Control;
    press("a");
    release("a");
    window.requestIdleCallback(() =>
      expect(PRESSED_CONTROLS["test" as Control]).toBeFalsy(),
    );
  });
});
