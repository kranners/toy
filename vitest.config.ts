import wasm from "vite-plugin-wasm";
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [wasm()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          launch: {},
          context: {},
        },
      ],
    },
  },
})
