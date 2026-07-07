import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
      ".playwright/**",
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,
  // eslint-config-next already registers the jsx-a11y plugin (and the full
  // react-hooks v7 recommended set incl. React Compiler rules). Layer the
  // jsx-a11y flat recommended RULES on top without re-registering the plugin
  // (a second plugin instance would trigger "Cannot redefine plugin").
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  // lib/pdf renders @react-pdf/renderer primitives (Image, Text, View) into a
  // PDF byte stream, not the DOM — DOM accessibility rules do not apply and
  // react-pdf's <Image> has no alt prop.
  {
    files: ["lib/pdf/**"],
    rules: {
      "jsx-a11y/alt-text": "off",
    },
  },
];

export default config;
