import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  output: {
    file: "./build/js13kgame-2019.min.js",
    format: "iife",
    name: "bundle"
  },
  plugins: [typescript()]
};
