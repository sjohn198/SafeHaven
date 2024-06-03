import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const customRules = {
  "no-undef": "warn"
  // feel free to add more rules
};

export default [
  { languageOptions: { globals: globals.browser } },
  {
    ...pluginJs.configs.recommended,
    rules: { ...pluginJs.configs.recommended.rules, ...customRules },
    settings: { react: { version: "detect" } }
  },
  pluginReactConfig
];
