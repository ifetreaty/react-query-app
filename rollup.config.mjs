// rollup.config.mjs
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; //handles ES6 features
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss"; //handles css imports
import path from "path";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default {
  input: "src/main.tsx",
  output: [
    {
      file: "dist/bundle.js",
      format: "iife",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies
    typescript({
      // TypeScript integration
      tsconfig: "./tsconfig.app.json",
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these extensions
    }),
    commonjs(), // Convert CommonJS to ES6
    postcss({
      extensions: [".css"], // Process and bundle CSS files
      extract: path.resolve("dist/styles.css"), // CSS file output
      minimize: true, // Minify the CSS
    }),
    terser(), // Minify JS bundle
    copy({ targets: [{ src: "./index.html", dest: "dist" }] }),
  ],
  // external: ["react", "react-dom"], // Externalize React dependencies
};
