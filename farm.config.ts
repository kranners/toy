import { defineConfig } from '@farmfe/core';
import wasm from '@farmfe/plugin-wasm';

export default defineConfig({
  plugins: [wasm(),],
  compilation: {
    // persistentCache: false,
    input: {
      index: 'index.html'
    },
    output: {
      path: 'build',
      publicPath: '/',
      targetEnv: 'browser'
    }
  },
});
