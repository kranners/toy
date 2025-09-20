import { describe, expect, it, vi } from "vitest";
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

// These are in waitFor()s since the controls system uses events.
describe("controls system", () => {
  controls.init({}, testEngine);

  it("sets a key to being pressed when it is pressed", async () => {
    press("a");
    await vi.waitFor(() => {
      expect(PRESSED_KEYS.a).toBeTruthy();
    });
    release("a");
  });

  it("does not set a key to being pressed when it isn't", async () => {
    press("a");
    await vi.waitFor(() => {
      expect(PRESSED_KEYS.b).toBeFalsy();
    });
    release("a");
  });

  it("unsets a key when the key is released", async () => {
    press("a");
    release("a");
    await vi.waitFor(() => {
      expect(PRESSED_KEYS.a).toBeFalsy();
    });
  });

  it("does not unset a key when the key isn't released", async () => {
    press("a");
    press("b");

    release("a");
    await vi.waitFor(() => {
      expect(PRESSED_KEYS.b).toBeTruthy();
    });
    release("b");
  });

  it("sets the corresponding control when a key is pressed", async () => {
    KEYS_TO_CONTROLS["a"] = "test" as Control;
    press("a");
    await vi.waitFor(() => {
      expect(PRESSED_CONTROLS["test" as Control]).toBeTruthy();
    });
    release("a");
  });

  it("unsets the corresponding control when a key is released", async () => {
    KEYS_TO_CONTROLS["a"] = "test" as Control;
    press("a");
    release("a");
    await vi.waitFor(() => {
      expect(PRESSED_CONTROLS["test" as Control]).toBeFalsy();
    });
  });
});
