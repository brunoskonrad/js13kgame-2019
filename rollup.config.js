import typescript from "rollup-plugin-typescript";
import compiler from '@ampproject/rollup-plugin-closure-compiler';

export default {
  input: "./src/index.ts",
  output: {
    file: "./build/js13kgame-2019.min.js",
    format: "iife",
    name: "bundle"
  },
  plugins: [typescript(), compiler()]
};
