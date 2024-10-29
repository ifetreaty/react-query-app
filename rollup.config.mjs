// rollup.config.mjs
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";

import postcss from "rollup-plugin-postcss";

// eslint-disable-next-line no-undef
const isProd = process.env.NODE_ENV === "production";

export default {
  input: "src/main.tsx",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelrc: true,
      exclude: /node_modules/,
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
    }),
    postcss({
      extract: true,
      minimize: false,
    }),
    !isProd &&
      serve({
        open: true,
        contentBase: ["."],
        port: 3000,
      }),
    !isProd && livereload("."),
  ],
};
