import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: "warn",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      semi: ["warn", "always"],
      camelcase: ["warn", { properties: "always" }],
      quotes: ["error", "double"],
      "no-var": "error",
    },
  },
];