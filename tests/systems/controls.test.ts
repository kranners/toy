import { describe, expect, it } from "vitest";
import { controls, PRESSED_KEYS } from "../../src/systems/controls";
import { testEngine } from "../../vitest.setup";
import { userEvent } from "@vitest/browser/context";

const press = (key: string) => userEvent.keyboard(`{${key}>}`);
const release = (key: string) => userEvent.keyboard(`{/${key}}`);

describe("controls system", () => {
  it("sets a key to being pressed when it is pressed", async () => {
    controls.init({}, testEngine);
    press("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.a).toBeTruthy());
    release("a");
  });

  it("does not set a key to being pressed when it isn't", () => {
    controls.init({}, testEngine);
    press("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.b).toBeFalsy());
    release("a");
  });

  it("unsets a key when the key is released", () => {
    controls.init({}, testEngine);
    press("a");
    release("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.a).toBeFalsy());
  });

  it("does not unset a key when the key isn't released", () => {
    controls.init({}, testEngine);

    press("a");
    press("b");

    release("a");
    window.requestIdleCallback(() => expect(PRESSED_KEYS.b).toBeTruthy());
    release("b");
  });
});
