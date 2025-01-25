import wasm from "vite-plugin-wasm";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [wasm()],
  test: {
    exclude: [
      "**/.direnv/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.{git,cache,output,temp}/**",
      "**/*.config.*",
    ],
    setupFiles: ["vitest.setup.ts"],
    browser: {
      enabled: true,
      provider: "playwright",
      testerHtmlPath: "tests/index.html",
      viewport: {
        width: 300,
        height: 300,
      },
      instances: [{ browser: "chromium" }],
    },
  },
});
