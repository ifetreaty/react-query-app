// rollup.config.mjs
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; //handles ES6 features
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss"; //handles css imports
import path from "path";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/main.tsx",
  output: [
    {
      file: "dist/bundle.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these extensions
      browser: true,
      dedupe: ["react", "react-dom"],
    }),
    typescript({
      // TypeScript integration
      tsconfig: "./tsconfig.app.json",
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(), // Convert CommonJS to ES6
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    postcss({
      extensions: [".css"], // Process and bundle CSS files
      extract: path.resolve("dist/styles.css"), // CSS file output
      minimize: true, // Minify the CSS
    }),
    terser(), // Minify JS bundle
    copy({ targets: [{ src: "./index.html", dest: "dist" }] }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ],
  external: ["react", "react-dom"], // Externalize React dependencies
};
