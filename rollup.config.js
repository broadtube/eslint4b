import {terser} from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
const commonjs = require("rollup-plugin-commonjs")

export default {
  input: './dist/index.js',
  output: [{
    file: 'dist/eslint4b.es.js',
    format: 'es',
    sourcemap: false,
  },
  {
    file: 'dist/eslint4b.umd.js',
    format: 'umd',
    sourcemap: false,
    name: 'Linter',
  }
],
  plugins: [commonjs(),terser(),nodePolyfills(),nodeResolve({ preferBuiltins: false }),json(),]
};
